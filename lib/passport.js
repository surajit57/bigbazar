
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
var User = models.user;

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(
    smtpTransport('smtps://bigbajar88@gmail.com:bigbajar@123@smtp.gmail.com')
);
var html_text = '<p><b>Thanks for signup</b>. Please start uploading your blog link.';
function send_mail(email){
	transporter.sendMail({
	    from: 'bigbajar88@gmail.com',
	    to: email,
	    cc: 'shashidhar@teampumpkin.com',
	    text: 'Authenticated with OAuth2',
	    subject: '🐴BigBazar',
	    html: html_text
		}, function(error, response) {
		   if (error) {
		        console.log('error while sending mail:- ',error);
		   } else {
		        console.log('E-Message sent');
		   }
		});
}

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
		      var email = req.body.email;
		      send_mail(email);
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