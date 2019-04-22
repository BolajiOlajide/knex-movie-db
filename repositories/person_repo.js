'use strict';

const knex = require('../db');

module.exports = {
  async listPeople(searchText) {
    const people = await knex('person')
      // .where('name', 'like', `%${searchText}%`) // PG doesn't work because it does a case-sensitive comparison
      .whereRaw("LOWER(name) like '%' || LOWER(?) || '%'", searchText)
      .select('id', 'name as text')
      .orderBy('name');
    knex.destroy();
    return people;
  },
  async addPerson(person) {
    const promise = await knex('person').insert(person, 'id');
    knex.destroy();
    return promise;
  }
};
