var models = require('../models');
var User = models.user; 
var Blog = models.blog;

var UserController = {};

UserController.getSignupPage = function(req, res){
	res.render('test.html');
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
  // req.checkBody('name' , 'Name field is required').notEmpty();
  // req.checkBody('email' , 'Email field is required').notEmpty();
  // req.checkBody('email' , 'email field is required').isEmail();
  // req.checkBody('password' , 'password field is required').notEmpty();
  // req.checkBody('password2' , 'password do not match').equals(req.body.password);

  // //check error
  // var errors = req.validationErrors();

  // if(errors){
  //   res.render('register' , {errors:errors})
  // }else{
    var user = User.build({
      name: req.body.name,
      email: req.body.email,
      password: User.generateHash(req.body.password),
      // phone: req.body.phone
    });
    user.save().then(function(user){
      if(!user) throw Error('user has not created'); 
      return res.redirect('/users/home')   
    });
    
  // }
};

UserController.postBlog = function(req,res){
  console.log("hello this is blog post>.....................");
  console.log('user:-- ',req.user);
  console.log('::::::::::::::::::;;session:-- ', req.session, '..................................');
  console.log(req.body);
  var url = req.body.blog_url;
  console.log('url:- ',url);
  // var userId = req.session.id;

  //form validation
  // req.checkBody('name' , 'Name field is required').notEmpty();
  // req.checkBody('email' , 'Email field is required').notEmpty();
  // req.checkBody('email' , 'email field is required').isEmail();
  // req.checkBody('password' , 'password field is required').notEmpty();
  // req.checkBody('password2' , 'password do not match').equals(req.body.password);

  // //check error
  // var errors = req.validationErrors();

  // if(errors){
  //   res.render('register' , {errors:errors})
  // }else{

    // var blog = Blog.build({
    //   url: req.body.name
    //   // userId: req.session.id,
    //   // password: User.generateHash(req.body.password),
    //   // phone: req.body.phone
    // });
    // blog.save().then(function(blog){
    //   if(!blog) throw Error('blog has not created'); 
    //   console.log('created')
    //   return res.redirect('/users/home')   
    // });
    

  // }
};



module.exports = UserController;