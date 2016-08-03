'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('blogs','url1',{
      type: Sequelize.STRING,
      allowNull: true
    })
    .then(function(){
      return queryInterface.addColumn('blogs', 'url2',{
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
    return queryInterface.removeColumn('blogs', 'url1')
    .then(function(){
      return queryInterface.removeColumn('blogs', 'url2')
    })
  }
};
