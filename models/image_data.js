'use strict';
module.exports = function(sequelize, DataTypes) {
  var image_data = sequelize.define('image_data', {
    blog_id: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        image_data.belongsTo(models.blog);
      }
    }
  });
  return image_data;
};