
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var User = models.User;
var Blog = models.Blog;
var Image = models.Image;

module.exports = function(passport){

	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});	

	passport.use(new LocalStrategy(
	  function(username, password, done) {
	  	console.log('username', username, '  ',password);
	    User.findOne({ email: username }, function(err, user) {
	      if (err) { return done(err); }
	      if (!user) {
	        return done(null, false, { message: 'Incorrect username.' });
	      }
	      if (!user.validPassword(password)) {
	        return done(null, false, { message: 'Incorrect password.' });
	      }
	      return done(null, user);
	    });
	  }
	));
}