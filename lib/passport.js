
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
var User = models.user;

module.exports = function(passport){

	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser( function(id, done){
	  User.findById(id).asCallback( done );
	});

	passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {
    	User.findOne({where:{email:req.body.email}}).then(function(user){
    		if(user){
    			return done(null, false);
    		};
    		var user = User.build({
		      name: req.body.name,
		      email: req.body.email,
		      password: User.generateHash(req.body.password),
		      // phone: req.body.phone
		    });
		    user.save().then(function(user){
		      if(!user) return done(null, false); 
		      return done(null, user);   
		    });

    	})
    }));


	passport.use('local-login', new LocalStrategy({
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

	passport.use('local-admin-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done) {
    	User.findOne({where:{email:req.body.email}}).then(function(user){
    		if(user){
    			return done(null, false);
    		};
    		var user = User.build({
		      name: req.body.name,
		      email: req.body.email,
		      password: User.generateHash(req.body.password),
		      isAdmin: 1
		      // phone: req.body.phone
		    });
		    user.save().then(function(user){
		      if(!user) return done(null, false); 
		      return done(null, user);   
		    });

    	})
    }));
}