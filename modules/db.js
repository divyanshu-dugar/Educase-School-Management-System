const Sequelize = require('sequelize');
const env = require('dotenv');
const path = require('path');
env.config(path.join(__dirname , '../.env'));

// -------------------------
// Set up a sequelize object
// -------------------------

// Aiven
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'school-management-divyu2004-2029.e.aivencloud.com',
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  dialectOptions: {
    ssl: {
      require: process.env.DB_SSL === 'true',
      rejectUnauthorized: false, // For self-signed certificates
    },
  },
});

// Test to check for the Data Base Connection
sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((err) => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;
