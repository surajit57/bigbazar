'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email:{
      type:DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    gender:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
    },
    isBlogAdded:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAdmin:{
      type: DataTypes.BOOLEAN,
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