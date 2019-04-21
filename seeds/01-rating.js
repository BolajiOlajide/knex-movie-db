const tblName = 'rating';

exports.seed = knex => knex(tblName).del()
  .then(() => {
    // Inserts seed entries
    return knex(tblName).insert([
      { name: 'G' },
      { name: 'PG' },
      { name: 'PG-13' },
      { name: 'R' }
    ]);
  });
