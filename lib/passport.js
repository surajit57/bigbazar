
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
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
	    bcc: 'shashidhar@teampumpkin.com',
	    text: 'Authenticated with OAuth2',
	    subject: 'BigBazaar',
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

  passport.use(new FacebookStrategy({
   clientID: config.fbLogin.appId,
   clientSecret: config.fbLogin.appSecret,
   callbackURL: '/users/auth/facebook/callback',
   profileFields: ['name', 'email', 'link', 'locale', 'timezone','picture.type(large)'],
   passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
   return User.findOne({where: { email: profile.emails[0].value } } )
     .then( function( existingUser ){
       if (existingUser) {
         req.user = existingUser;
         console.log('existingUser:-- ',existingUser);
         return existingUser;
       }
       console.log('facebook new user');
       var user = User.build({
         name: profile.displayName || ( profile.name.givenName + ' ' + profile.name.familyName ),
         password: User.generateHash((''+Math.random(10)).substring(2,10)),
         email: profile.emails[0].value,
        //  displayPic : profile.photos[0].value || 'https://graph.facebook.com/'+profile.id+'/picture?type=large'
       });

     return user.save();
   })
   .then(function(user){
    //  user.save().then(function(user){
       if(!user) return done(null, false);
       var email = user.email;
       console.log('facebook signup emal:-- ',email);
       send_mail(email);
       return done(null, user);
    //  });
   })
  //  .asCallback( done );
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
