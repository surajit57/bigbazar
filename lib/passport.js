
var passport = require('passport');
var LocalStrategy = require('passport-local');
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


	passport.use('local-signup', new LocalStrategy({
	    usernameField : 'email',
	    passwordField : 'password',
	    passReqToCallback : true
	  },
	  function(req, email, password,done ) {
	    return Users.findOne({where:{email:email}}).then(function(user){
	    	if(user && user.validPassword(password))
	        	return user; 
	    }).asCallback(done);
	}));

	passport.use('local-login', new LocalStrategy({
	    usernameField : 'email',
	    passwordField : 'password',
	    genderField: 'gender',
	    phoneField:'phone',
	    passReqToCallback : true
	  },
	  function(req, email, password, gender, phone, done ) {
	  	console.log(gender , "------------------");
	    // return Users.findOne({where:{email:email}}).then(function(user){
	    // 	if(user && user.validPassword(password))
	    //     	return user; 
	    // }).asCallback(done);
	}));
}