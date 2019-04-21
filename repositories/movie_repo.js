'use strict';

const knex = require('../db');
const dbUtil = require('../utils/db_util');

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
  }
};
