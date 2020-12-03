const { Pool } = require('pg')

var pool;

module.exports = {
  getPool: () => {
    if (pool) {
      return pool;
    } else {
      pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'silain',
        password: 'p',
        port: 5432
      });
      console.log('💽 Connected to DB');
      return pool;
    }
  }
}
