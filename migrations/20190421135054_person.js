
exports.up = (knex) => knex.schema
  .createTable('person', (tbl) => {
    // PK
    tbl.increments();
    // other fields
    tbl.string('firstname', 30).notNullable().default('n/a'); // because by default columns are nullable
    tbl.string('lastname', 30).notNullable().default('n/a');
    tbl.string('junk', 60).notNullable().default('n/a');
  });

exports.down = knex => knex
  .schema.dropTable('person'); // you can use the dropTableIfExists to be sure the table exists lol
