
exports.up = knex => knex
  .schema.hasTable('person')
  .then((tableExists) => {
    if (tableExists) {
      return knex
        .schema.table('person', (tbl) => {
          tbl.dropColumn('junk')
        });
    }
  });

exports.down = knex => knex
  .schema.table('person', tbl => {
    tbl.string('junk', 60).notNullable().default('n/a');
  });
