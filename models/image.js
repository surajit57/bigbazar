'use strict';
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('image', {
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Image.belongsTo(models.blog);
      }
    }
  });
  return Image;
};