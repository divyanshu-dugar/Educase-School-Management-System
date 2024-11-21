const sequelize = require('./db');
const School = require('./school');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    process.exit();
  }
})();

module.exports = app;