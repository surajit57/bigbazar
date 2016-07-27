
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
var User = models.user;

module.exports = function(passport){

	passport.serializeUser((user, done) => {
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
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
  //       connection.query("select * from users where email = '"+email+"'",function(err,rows){
		// 	console.log(rows);
		// 	console.log("above row object");
		// 	if (err)
  //               return done(err);
		// 	 if (rows.length) {
  //               return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
  //           } else {

		// 		// if there is no user with that email
  //               // create the user
  //               var newUserMysql = new Object();
				
		// 		newUserMysql.email    = email;
  //               newUserMysql.password = password; // use the generateHash function in our user model
			
		// 		var insertQuery = "INSERT INTO users ( email, password ) values ('" + email +"','"+ password +"')";
		// 			console.log(insertQuery);
		// 		connection.query(insertQuery,function(err,rows){
		// 		newUserMysql.id = rows.insertId;
				
		// 		return done(null, newUserMysql);
		// 		});	
  //           }	
		// });
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

	
}