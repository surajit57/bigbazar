'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.removeColumn('users', 'isSelectedForRound1')
    .then(function(){
        return queryInterface.removeColumn('users', 'isSelectedForRound2');
      })
      .then(function(){
        return queryInterface.removeColumn('users', 'isSelectedForRound3');
      })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.addColumn('users', 'isSelectedForRound1',{
      type: Sequelize.BOOLEAN,
      allowNull: true
    })
    .then(function(){
        return queryInterface.addColumn('users', 'isSelectedForRound2',{
          type: Sequelize.BOOLEAN,
          allowNull: true
        });
      })
    .then(function(){
        return queryInterface.addColumn('users', 'isSelectedForRound3',{
          type: Sequelize.BOOLEAN,
          allowNull: true
        });
      })
  }
};
