// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: { filename: './movie.sqlite' },
    migrations: { tableName: 'knex_migrations' },
    seeds: { directory: './seeds' },
    debug: false
  },

  production: {
    client: 'pg',
    connection: {
      host:     'localhost',
      user:     'username',
      password: 'password',
      database: 'movie'
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: 'knex_migrations' },
    seeds: { directory: './seeds' },
    debug: false
  }

};
