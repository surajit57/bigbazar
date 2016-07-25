var models = require('../models');
var User = models.User; 

var UserController = {};

UserController.getSignupPage = function(req, res){
	res.render('signup.html');
}

Home.postSignup = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  // req.assert('phone', 'invalid phone number').isMobilePhone('en-IN');
  var password = 
  const errors = req.validationErrors() ;

  if (errors) {
    return next( errors );
  }

  return User.findOne({
    where: { email: req.body.email }
  })
  .then( function( existingUser ){
    if (existingUser) {
      return Promise.reject( req.redirect('/user/signup'));
    }
  })
  .then( function(){
    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: User.generateHash(req.body.password),
      phone: req.body.phone,
      gender: req.body.gender
    });
  })
  .then(function(user){
    return res.render('user/login');
  })
  .catch(next);
};


module.exports = UserController;