'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('users', 'hobbies',{
      type: Sequelize.STRING,
      allowNull: true
    })
    .then(function(){
      return queryInterface.addColumn('users', 'bio',{
        type: Sequelize.STRING,
        allowNull: true
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('users', 'hobbies')
    .then(function(){
      return queryInterface.removeColumn('users', 'bio')
    })
  }
};
