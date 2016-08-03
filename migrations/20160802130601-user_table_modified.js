'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
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
    .then(function(){
        return queryInterface.addColumn('users', 'isRound1BlogAdded',{
          type: Sequelize.BOOLEAN,
          allowNull: true
        });
      })
    .then(function(){
        return queryInterface.addColumn('users', 'isRound2BlogAdded',{
          type: Sequelize.BOOLEAN,
          allowNull: true
        });
      })
    .then(function(){
        return queryInterface.addColumn('users', 'isRound3BlogAdded',{
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
    return queryInterface.removeColumn('users', 'isSelectedForRound1')
    .then(function(){
        return queryInterface.removeColumn('users', 'isSelectedForRound2');
      })
      .then(function(){
        return queryInterface.removeColumn('users', 'isSelectedForRound3');
      })
      .then(function(){
        return queryInterface.removeColumn('users', 'isRound1BlogAdded');
      })
      .then(function(){
        return queryInterface.removeColumn('users', 'isRound2BlogAdded');
      })
      .then(function(){
        return queryInterface.removeColumn('users', 'isRound3BlogAdded');
      })
  }
};
