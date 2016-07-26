'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.removeColumn('blogs','title')
    .then(function(){
      return queryInterface.removeColumn('blogs','context');
    })

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.addColumn(
      'blogs',
      'title',
      {
        type: Sequelize.STRING
      }
    )
    .then(function(){
      return queryInterface.addColumn(
      'blogs',
      'context',
      {
        type: Sequelize.STRING
      }
    )
    })
  }
};
