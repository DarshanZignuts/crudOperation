const Sequelize = require("sequelize");
const config = require('../../config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  operatorsAliases: 0
});

sequelize.authenticate()
.then(() => {
    console.log("connected to database");
})
.catch(err => {
    console.log("-err in database connection :: ", err);
});

sequelize.sync();

module.exports = sequelize;
global.sequelize = sequelize;