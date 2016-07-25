'use strict';
module.exports = function(sequelize, DataTypes) {
  var image = sequelize.define('image', {
    blog_id: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        image.belongsTo(models.blog);
      }
    }
  });
  return image;
};