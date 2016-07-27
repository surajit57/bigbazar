var models = require('../models');
var User = models.user; 
var Blog = models.blog;
var randomstring = require('randomstring');

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
};

UserController.postBlog = function(req,res){

  var url = req.body.blog_url;
  var UserId = req.user.id;
 
    var blog = Blog.build({
      url: req.body.blog_url,
      userId: req.user.id
    });
    blog.save().then(function(blog){
      if(!blog) return res.redirect('/users/home');
          console.log('blog created');
          User.update({
            isBlogAdded: 1
          },{
            where: {
              id: req.user.id
            }
          }).then(function(userData) {
            req.flash('info', 'Blog sucessfully posted');
            return res.redirect('/users/home') 
          });
    });
};


UserController.getAdminSignupPage = function(req, res){
  res.render('adminPanel1/signup.html');
}
UserController.postAdminSignupPage = function(req,res){
  console.log("Admin Admin");
  var name = req.body.name;
  var email = req.body.email;
  // var password = randomstring.generate(7);
  var password = req.body.password;
 
    var adminuser = User.build({
      name: req.body.name,
      email: req.body.email,
      password: User.generateHash(password),
      isAdmin: 1
      // phone: req.body.phone
    });
    adminuser.save().then(function(adminuser){
      if(!adminuser) throw Error('user has not created'); 
      return res.redirect('/admin/home')   
    });
};

UserController.getAllUsers = function(req, res){
  console.log('getAllUsers called');
  Blog.findAll({include:[{ model: models.user }]}).then(function(allblogs) {
  console.log('allblogs:-- ', allblogs[0].toJSON());
})

  // res.render('adminPanel1/index.html');
  // res.render('adminPanel1/signup.html');
}
module.exports = UserController;