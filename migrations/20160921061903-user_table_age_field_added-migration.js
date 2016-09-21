'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('users', 'age',{
      type: Sequelize.STRING,
      allowNull: true
    })
      .then(function(){
        return queryInterface.addColumn('users', 'city',{
          type: Sequelize.STRING,
          allowNull: true
        });
      })
      .then(function(){
        return queryInterface.addColumn('users', 'resetPasswordToken',{
          type: Sequelize.STRING,
          allowNull: true
        });
      })
      .then(function(){
        return queryInterface.addColumn('users', 'resetPasswordExpires',{
          type: Sequelize.DATE,
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
    return queryInterface.removeColumn('users', 'age')
      .then(function(){
        return queryInterface.removeColumn('users', 'city');
      })
      .then(function(){
        return queryInterface.removeColumn('users', 'resetPasswordToken');
      })
      .then(function(){
        return queryInterface.removeColumn('users', 'resetPasswordExpires');
      })
  }
};
