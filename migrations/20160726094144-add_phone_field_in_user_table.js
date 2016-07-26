'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     return  queryInterface.addColumn( 'users', 'phone',
    { type: Sequelize.INTEGER })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'phone');
  }
};
