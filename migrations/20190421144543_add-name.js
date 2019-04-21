
exports.up = knex => knex
  .schema.table('person', tbl => {
    tbl.string('name', 60).notNullable().default('n/a');
  })

exports.down = knex => knex
  .schema.table('person', tbl => {
    tbl.dropColumn('name');
  });
