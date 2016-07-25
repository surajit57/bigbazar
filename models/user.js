'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email:{
      type:Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    gender:{
      type:Sequelize.STRING,
      allowNull: false,
    },
    password:{
      type:Sequelize.STRING,
      allowNull:false
    },
    isBlogAdded:{
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isAdmin:{
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};