'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define('blog', {
    url: DataTypes.STRING,
    url1: DataTypes.STRING,
    url2: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Blog.belongsTo(models.user);
      }
    }
  });
  return Blog;
};