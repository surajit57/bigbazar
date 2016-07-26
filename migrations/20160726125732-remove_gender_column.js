'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('users', 'gender')
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.addColumn('users', 'gender',{
      type:Sequelize.STRING,
      allowNull: false,
    })
  }
};
