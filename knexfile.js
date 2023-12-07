// require('dotenv').config();
// Update these settings for your database connection
module.exports = {
  development: { 
    client: 'pg',
    connection: {
      database: "exile_endeavors_db_dev",
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    }
  }
};

