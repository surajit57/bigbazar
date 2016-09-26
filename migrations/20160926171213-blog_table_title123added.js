'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('blogs','blog_title1',{
      type: Sequelize.STRING,
      allowNull: true
    })
    .then(function(){
      return queryInterface.addColumn('blogs','blog_title2',{
        type: Sequelize.STRING,
        allowNull: true
      })
    })
    .then(function(){
      return queryInterface.addColumn('blogs','blog_desc1',{
        type: Sequelize.STRING,
        allowNull: true
      })
    })
    .then(function(){
      return queryInterface.addColumn('blogs','blog_desc2',{
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
    return queryInterface.removColumn('blogs', 'blog_title1')
    .then(function(){
      return queryInterface.removColumn('blogs', 'blog_title2')
    })
    .then(function(){
      return queryInterface.removColumn('blogs', 'blog_desc1')
    })
    .then(function(){
      return queryInterface.removColumn('blogs', 'blog_desc2')
    })
  }
};
