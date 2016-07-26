'use strict';
module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define('blog', {
    url: DataTypes.STRING
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