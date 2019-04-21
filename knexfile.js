// Update with your config settings.

const baseCfg = {
  debug: false,
  pool: { min: 2, max: 10 },
  migrations: { tableName: 'knex_migrations' },
  seeds: { directory: './seeds' },
  debug: false
};

module.exports = {

  development: {
    ...baseCfg,
    client: 'sqlite3',
    connection: { filename: './movie.sqlite' },
    useNullAsDefault: true,
    pool: {
      // adding this because sqlite doesn't fully support foregn keys
      // so when you delete a movie it doesn't delete it's references in the
      // many-to-many table.
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys=ON', cb)
    }
  },

  production: {
    ...baseCfg,
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'username',
      password: 'password',
      database: 'movie'
    }
  }

};
