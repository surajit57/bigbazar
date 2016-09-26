
module.exports = {
up: function(queryInterface, Sequelize){
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
down: function(){
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
