'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define('blog', {
    title: DataTypes.STRING,
    context: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Blog.hasMany(models.image);
      }
    }
  });
  return Blog;
};