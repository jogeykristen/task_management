// const mysql = require('mysql');

// const pool = mysql.createPool({
//   host: 'your_hostname',
//   user: 'your_username',
//   password: 'your_password',
//   database: 'your_database_name'
// });

// module.exports = pool;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_management_System', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  password: 'postgres',
});

module.exports = sequelize;