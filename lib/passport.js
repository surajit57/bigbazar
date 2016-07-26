
var passport = require('passport');
var LocalStrategy = require('passport-local');
var models = require('../models');
var User = models.user;

module.exports = function(passport){

	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});	


	passport.use('local', new LocalStrategy({
	    usernameField : 'email',
	    passwordField : 'password',
	    passReqToCallback : true
	  },
	  function(req, email, password,done ) {
	    return User.findOne({where:{email:email}}).then(function(user){
	    	if(user && user.validPassword(password)){
	        	return user; 
	    	}
	    }).asCallback(done);
	}));

	
}