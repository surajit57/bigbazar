'use strict';
module.exports = function(sequelize, DataTypes) {
  var events = sequelize.define('events', {
    roundNo: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    roundBlocked: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return events;
};