const { Pool } = require('pg')

var pool;

module.exports = {
  getPool: () => {
    if (pool) {
      return pool;
    } else {
      pool = new Pool({
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'silain',
        password: process.env.DB_PASSWORD || 'p',
        port: process.env.DB_PORT || 5432
      });
      console.log('💽 Connected to DB');
      return pool;
    }
  }
}
