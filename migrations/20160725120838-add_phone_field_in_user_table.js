'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
  	return queryInterface.renameTable('users', 'user')
  	.then(function(){
  		return queryInterface.addColumn('user', 'phone' , {
	        type: Sequelize.INTEGER
	    })	
  	})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('user', 'phone').then(function(){
    	queryInterface.renameTable('user', 'users')
    })
  }
};
