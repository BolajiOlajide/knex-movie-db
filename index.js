'use strict';

const knex = require('./db');
const screen = require('./utils/screen');

// repositories
const movieRepo = require('./repositories/movie_repo');
const personRepo = require('./repositories/person_repo');


screen.clearConsole();

movieRepo.listMovies({ sort: 'title desc', pgSize: 2, pgNum: 1 })
  .then(result => screen.writeToConsole(result, 'pretty'))
  .catch(err => console.log('Error ==> ', err));
