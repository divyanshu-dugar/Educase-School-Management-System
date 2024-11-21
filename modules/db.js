const Sequelize = require('sequelize');
const env = require('dotenv');
const path = require('path');
env.config(path.join(__dirname , '../.env'));

// -------------------------
// Set up a sequelize object
// -------------------------

// MYSQL - Local

// const sequelize = new Sequelize(
//   process.env.DB_NAME, // Database name
//   process.env.DB_USER, // Database user
//   process.env.DB_PASSWORD, // Database password
//   {
//     host: process.env.DB_HOST, // Host
//     dialect: 'mysql', // Dialect
//     dialectModule: require('mysql2'),
//     port: process.env.DB_PORT || 3306, // Port (default to 3306 for MySQL)
//     dialectOptions: {
//       // Remove SSL options, as they are unnecessary for local databases
//     },
//   }
// );

// GOOGLE CLOUD

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
//   dialect: 'mysql',
//   host: process.env.DB_HOST, // This will be the connection name for Cloud SQL or public IP for local development
//   dialectOptions: {
//     socketPath: process.env.DB_HOST && process.env.DB_HOST.startsWith('/cloudsql') ? process.env.DB_HOST : undefined,
//   },
// });

// Aiven

const sequelize = new Sequelize(
  process.env.DB_NAME,   // Database name
  process.env.DB_USER,   // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,    // Database host (Aiven's provided host)
    port: process.env.DB_PORT,    // Database port
    dialect: 'mysql',             // Database dialect (MySQL in this case)
    dialectOptions: {
      ssl: {
        require: true,             // Enforces SSL
        rejectUnauthorized: false, // Bypasses self-signed certificate errors
      },
    },
    logging: false,   // Optional: Set to true to see SQL queries in console
  }
);


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