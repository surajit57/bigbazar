var models = require('../models');
var User = models.User; 

var UserController = {};

UserController.getSignupPage = function(req, res){
	res.render('index.html');
}

// UserController.postSignup = (req, res, next) => {
//   req.assert('email', 'Email is not valid').isEmail();
//   req.assert('password', 'Password must be at least 4 characters long').len(4);
//   req.assert('phone', 'invalid phone number').isMobilePhone('en-IN');
//   const errors = req.validationErrors() ;

//   if (errors) {
//     return next( errors );
//   }

//   return User.findOne({
//     where: { email: req.body.email }
//   })
//   .then( function( existingUser ){
//     if (existingUser) {
//       return Promise.reject( req.redirect('/user/signup'));
//     }
//   })
//   .then( function(){
//     return User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: User.generateHash(req.body.password),
//       phone: req.body.phone,
//       gender: req.body.gender
//     });
//   })
//   .then(function(user){
//     return res.render('user/login');
//   })
//   .catch(next);
// };



UserController.postSignup = function(req,res){
  console.log("hello this is it");
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;

  console.log(req.body);
  //form validation
  req.checkBody('name' , 'Name field is required').notEmpty();
  req.checkBody('email' , 'Email field is required').notEmpty();
  req.checkBody('email' , 'email field is required').isEmail();
  req.checkBody('password' , 'password field is required').notEmpty();
  req.checkBody('password2' , 'password do not match').equals(req.body.password);

  //check error
  var errors = req.validationErrors();

  if(errors){
    res.render('register' , {errors:errors})
  }else{
    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: User.generateHash(req.body.password),
      phone: req.body.phone,
      gender: req.body.gender
    })
    .then(function(user){
      if(!user) throw Error('user has not created');    
    });
    req.flash('success', 'you are now registered')
    res.location('/');
    return res.redirect('/')
  }
};


module.exports = UserController;