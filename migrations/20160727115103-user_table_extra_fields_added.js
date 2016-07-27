'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('users', 'isUnder100',{
      type: Sequelize.BOOLEAN,
      allowNull: true
    })
      .then(function(){
        return queryInterface.addColumn('users', 'isUnder15',{
          type: Sequelize.BOOLEAN,
          allowNull: true
        });
      })
      .then(function(){
        return queryInterface.addColumn('users', 'isUnder3',{
          type: Sequelize.BOOLEAN,
          allowNull: true
        });
      })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('users', 'isUnder100')
      .then(function(){
        return queryInterface.removeColumn('users', 'isUnder15');
      })
      .then(function(){
        return queryInterface.removeColumn('users', 'isUnder3');
      })
  }
};
