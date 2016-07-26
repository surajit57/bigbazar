'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameTable('blogs', 'blog');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameTable('blog', 'blogs');
  }
};
