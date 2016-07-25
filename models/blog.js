'use strict';
module.exports = function(sequelize, DataTypes) {
  var blog = sequelize.define('blog', {
    title: DataTypes.STRING,
    context: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        blog.hasMany(models.image_data);
      }
    }
  });
  return blog;
};