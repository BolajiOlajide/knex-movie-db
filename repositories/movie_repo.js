'use strict';
const knex = require('../db');
const dbUtil = require('../utils/db_util');
const {
  createMovieRelationObject
} = require('../utils/r');


module.exports = {
  async listTags() {
    const tags = await knex.select('id', 'name as text').from('tag');
    knex.destroy();
    return tags;
  },
  async listRatings() {
    const ratings = await knex.select('id', 'name as text').from('rating');
    knex.destroy();
    return ratings;
  },
  async getMovie(movieID) {
    const data = await knex('movie as m')
      .join('person as p', 'p.id', 'm.director_id')
      .select('m.*', 'p.name as director')
      .where('m.id', movieID)
      .first();
    return data;
  },
  async listTagsForMovie(movieID) {
    const data = await knex('tag as t')
      .select('t.id', 't.name as text')
      .joinRaw(
        'JOIN movie_tag mt ON mt.tag_id = t.id AND mt.movie_id = ?',
        movieID
      );
    return data;
  },
  async listActorsForMovie(movieID) {
    const data = await knex('person as p')
      .select(knex.raw(
        "p.id, p.firstname || ' ' || p.lastname as text"
      ))
      .joinRaw(
        'JOIN movie_actor ma ON ma.person_id = p.id AND ma.movie_id = ?',
        movieID
      );
    return data;
  },
  async get4edit(movieID) {
    const moviePromise = this.getMovie(movieID);
    const tagsPromise = this.listTagsForMovie(movieID);
    const actorsPromise = this.listActorsForMovie(movieID);

    const results = await Promise.all([
      moviePromise,
      tagsPromise,
      actorsPromise
    ]);
    knex.destroy();

    const movie = results[0];
    movie.actors = results[2];
    movie.tags = results[1];
    return Promise.resolve(movie);
  },
  async listMovies(qf) {
    const result = {};
    const { sort, pgNum } = qf;
    const pgSize = Math.min(qf.pgSize || 10, 10);
    const offset = ((pgNum || 1) - 1) * pgSize;

    const purifiedSortString = dbUtil.parseSortString(sort, 'm.id');

    const rows = await knex('movie as m')
      .select('m.id', 'm.title', 'm.lastplaydt', 'm.score', 'm.runtime', 'm.releaseyr', 'r.name as rating')
      // .select(knex.raw('count(*) OVER() AS _fullcount_')) - this won't work on an sqlite db
      .join('rating as r', 'r.id', 'm.rating_id')
      .limit(pgSize)
      .offset(offset)
      .orderBy(
        purifiedSortString.column,
        purifiedSortString.direction
      );
    const total = await knex('movie').count('* as total')
    knex.destroy();
    return { rows, total: total[0].total, pgSize };
  },
  async deleteMovie(movieID) {
    const promise = await knex('movie', 'count').where('id', movieID).del();
    knex.destroy();
    return promise;
  },
  async addMovie(m) {
    const { actors, tags, ...movie } = m;
    delete movie.id; // esnure no id is supplied for rhe insert operation

    let _actors, _tags, movieID;

    const trxPromise = await knex.transaction(trx => trx
      .insert(movie, 'id').into('movie')
      .then(ids => {
        movieID = ids[0];
        movie.id = movieID;

        _actors = createMovieRelationObject('person_id', movieID)(actors);
        _tags = createMovieRelationObject('tag_id', movieID)(tags);
        if (_actors.length > 0) return trx.insert(_actors).into('movie_actor');
      })
      .then(() => {
        if (_tags.length > 0) trx.insert(_tags).into('movie_tag');
      })
      .then(() => movieID)
    );
    knex.destroy();
    return trxPromise;
  },
  async getMovieTags(movieID) {
    return knex('movie_tag')
      .pluck('tag_id').where('movie_id', movieID);
  },
  async getMovieActors(movieID) {
    return knex('movie_actor')
      .pluck('person_id').where('movie_id', movieID);
  },
  async updateMovie(movie) {
    const {
      actors: newActorIds,
      tags: newTagIds,
      id: movieId,
      ...movieData
    } = movie;

    const [actorResponse, tagResponse] = await Promise.all([
      this.getMovieActors(movieId),
      this.getMovieTags(movieId)
    ]);

    const actorDelta = dbUtil.getMMDelta(newActorIds, actorResponse, 'person_id', movieId);
    const tagDelta = dbUtil.getMMDelta(newTagIds, tagResponse, 'tag_id', movieId);



    const promise = await knex.transaction(trx => {
      const queriesToRun = [
        trx('movie').where('id', movieId).update(movieData),
        trx('movie_actor').whereIn('person_id', actorDelta.IDsToDelete)
          .andWhere('movie_id', movieId).del(),
        trx('movie_tag').whereIn('tag_id', tagDelta.IDsToDelete)
          .andWhere('movie_id', movieId).del()
      ];

      if (actorDelta.rowsToAdd.length > 0) {
        queriesToRun.push(trx('movie_actor').insert(actorDelta.rowsToAdd));
      }

      if (tagDelta.rowsToAdd.length > 0) {
        queriesToRun.push(trx('movie_tag').insert(tagDelta.rowsToAdd));
      }

      return Promise.all(queriesToRun);
    });

    knex.destroy();
    return promise;
  }
};
