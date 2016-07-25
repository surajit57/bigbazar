'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type:Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      gender:{
        type:Sequelize.STRING,
        allowNull: false,
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
      },
      isBlogAdded:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isAdmin:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};