const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

module.exports = sequelize.define('Course', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },
      fees: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
       type: Sequelize.DATE,
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
       }
});