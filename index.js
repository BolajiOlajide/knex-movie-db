'use strict';

const knex = require('./db');
const screen = require('./utils/screen');

// repositories
const movieRepo = require('./repositories/movie_repo');
const personRepo = require('./repositories/person_repo');


// screen.clearConsole();

const edward = {
  firstname: 'Edward',
  lastname: 'Zwick',
  name: 'Edward Zwick'
};
const movie = {
  id: 10, // represents a new movie
  rating_id: 4,
  director_id: 28,
  actors: [16, 42, 10, 18],
  tags: [12,7,20,21],
  title: 'The Last Samurai !!!',
  releaseyr: '2003',
  score: 7,
  lastplaydt: '2015-10-20',
  overview: 'Blah blah blah - can\'t type'
};

// movieRepo.listMovies({ sort: 'title desc', pgSize: 2, pgNum: 1 })
// movieRepo.deleteMovie(9)
// personRepo.addPerson(edward)
// movieRepo.addMovie(movie)
// movieRepo.get4edit(10)
movieRepo.updateMovie(movie)
  .then(result => screen.writeToConsole(result, 'pretty'))
  .catch(err => console.log('Error ==> ', err));
