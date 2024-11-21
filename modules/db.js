const Sequelize = require('sequelize');
const env = require('dotenv');
const path = require('path');
env.config(path.join(__dirname , '../.env'));

// -------------------------
// Set up a sequelize object
// -------------------------

const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Host
    dialect: 'mysql', // Dialect
    dialectModule: require('mysql2'),
    port: process.env.DB_PORT || 3306, // Port (default to 3306 for MySQL)
    dialectOptions: {
      // Remove SSL options, as they are unnecessary for local databases
    },
  }
);

// Test to check for the Data Base Connection
// sequelize
// .authenticate()
// .then(() => {
//     console.log('Connection has been established successfully.');
// })
// .catch((err) => {
//     console.error('Unable to connect to the database:', err);
// });

module.exports = sequelize;