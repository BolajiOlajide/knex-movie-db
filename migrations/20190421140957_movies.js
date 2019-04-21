
exports.up = knex => knex.schema
  .createTable('rating', tbl => {
    tbl.increments();
    tbl.string('name', 5).notNullable().unique('uq_rating_name'); // specifying the unique constraint
  })
  .createTable('movie', tbl => {
    // PK
    tbl.increments();

    // FKs
    tbl.integer('rating_id').notNullable().references('id').inTable('rating'); // specify foreign key
    tbl.integer('director_id').notNullable().references('id').inTable('person');

    // other columns
    tbl.string('title', 200).notNullable().defaultTo('');
    tbl.string('overview', 999);
    tbl.integer('releaseyr');
    tbl.integer('score').notNullable().defaultTo(7);
    tbl.integer('runtime').notNullable().defaultTo(90);
    tbl.date('lastplaydt');
  })
  .createTable('tag', tbl => {
    tbl.increments();
    tbl.string('name', 5).notNullable().unique('uq_tag_name'); // specifying the unique constraint
  })
  .createTable('movie_tag', tbl => {

    // FKs
    tbl.integer('tag_id').notNullable().references('id').inTable('tag').onDelete('CASCADE');
    tbl.integer('movie_id').notNullable().references('id').inTable('movie').onDelete('CASCADE');

    // PK for MtoM table
    tbl.primary(['tag_id', 'movie_id'])
  })
  .createTable('movie_actor', tbl => {

    // FKs
    tbl.integer('person_id').notNullable().references('id').inTable('person').onDelete('CASCADE');
    tbl.integer('movie_id').notNullable().references('id').inTable('movie').onDelete('CASCADE');

    // PK for MtoM table
    tbl.primary(['person_id', 'movie_id'])
  })
  .catch(error => console.log(error.message));

exports.down = knex => knex.schema
  .dropTable('rating')
  .dropTable('movie')
  .dropTable('tag')
  .dropTable('movie_tag')
  .dropTable('movie_actor')
  .catch(error => console.log(error.message));

