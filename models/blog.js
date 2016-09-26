'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define('blog', {
    url: DataTypes.STRING,
    url1: DataTypes.STRING,
    url2: DataTypes.STRING,
    blog_title: DataTypes.STRING,
    blog_desc: DataTypes.STRING,
    blog_title1: DataTypes.STRING,
    blog_desc1: DataTypes.STRING,
    blog_title2: DataTypes.STRING,
    blog_des2c: DataTypes.STRING
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
