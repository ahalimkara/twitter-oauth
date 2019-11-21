const mysql = require('mysql');
const config = require('./config/config');

const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
});

connection.query('USE virgin;');

const query = async (query, values = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
};

module.exports = {
  connection,
  query,
};
