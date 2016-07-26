'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn('image', 'blog_id')
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.addColumn('image', 'blog_id')
  }
};
