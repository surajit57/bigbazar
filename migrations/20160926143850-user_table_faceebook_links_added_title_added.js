'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn('users','faceBook_url',{
      type: Sequelize.STRING,
      allowNull: true
    })
    .then(function(){
      return queryInterface.addColumn('users','twitter_url',{
        type: Sequelize.STRING,
        allowNull: true
      })
    })
    .then(function(){
      return queryInterface.addColumn('users','instagram_url',{
        type: Sequelize.STRING,
        allowNull: true
      })
    })
    .then(function(){
      return queryInterface.addColumn('users','youtube_url',{
        type: Sequelize.STRING,
        allowNull: true
      })
    })
    .then(function(){
      return queryInterface.addColumn('users','snapchat_url',{
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
    return queryInterface.removColumn('users', 'faceBook_url')
    .then(function(){
      return queryInterface.removColumn('users', 'twitter_url')
    })
    .then(function(){
      return queryInterface.removColumn('users', 'instagram_url')
    })
    .then(function(){
      return queryInterface.removColumn('users', 'youtube_url')
    })
    .then(function(){
      return queryInterface.removColumn('users', 'snapchat_url')
    })
  }
};


module.exports = {
up: function(queryInterface, Sequelize){

},

};
