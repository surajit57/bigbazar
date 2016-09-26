'use strict';
var bcrypt = require('bcryptjs')

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email:{
      type:DataTypes.STRING,
      unique: true,
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
    },
    phone:{
      type: DataTypes.STRING
    },
    isUnder100:{
      type: DataTypes.BOOLEAN
    },
    isUnder15: {
      type: DataTypes.BOOLEAN
    },
    isUnder3: {
      type: DataTypes.BOOLEAN
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    isRound1BlogAdded: {
      type: DataTypes.BOOLEAN
    },
    isRound2BlogAdded: {
      type: DataTypes.BOOLEAN
    },
    isRound3BlogAdded: {
      type: DataTypes.BOOLEAN
    },
    age: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
    },
    blogEmail:{
      type: DataTypes.STRING
    },
    blogUserName: {
      type: DataTypes.STRING
    },
    hobbies: {
      type: DataTypes.STRING
    },
    bio: {
      type: DataTypes.STRING
    },
    // faceBook_url: DataTypes.STRING,
    // twitter_url: DataTypes.STRING,
    // instagram_url: DataTypes.STRING,
    // youtube_url: DataTypes.STRING,
    // snapchat_url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.blog);
      },
      generateHash: function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
    },
    instanceMethods: {
        validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        },
    }

  });
  return User;
};
