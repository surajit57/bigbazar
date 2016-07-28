var models = require('../models');
var User = models.user; 
var Blog = models.blog;
var randomstring = require('randomstring');
// const map = require('promise-map');
var Promise = require('bluebird');


var UserController = {};

UserController.getSignupPage = function(req, res){
	res.render('test.html');
}


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
            // req.flash('info', 'Blog sucessfully posted');
            return res.redirect('/users/home') 
          });
    });
};


UserController.getAdminSignupPage = function(req, res){
  res.render('adminPanel1/signup.html');
}


UserController.getAllBlogs = function(req, res){
    Blog.findAll({include:[{ model: models.user }]}).then(function(allblogs) {
      console.log('allblogs:- ',allblogs.length);
    res.render('adminPanel1/index.html', {blogs: allblogs});
  });
}


UserController.postSelectFor100 = function(req, res){
var arr = JSON.parse(req.body.userIds);
  User
  .count({
     where: {
        isUnder100: 1
     }
  })
  .then(function(result) {
    if(result >= 100){
      console.log('Already selectFor100 is full');
    }
    else{
     return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder100: 1
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are selectFor100 ',user);
              res.json({ code: 200 })
           })
    }
  });
}

UserController.unselectFor100 = function(req, res){
  var arr = JSON.parse(req.body.userIds);
  return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder100: 0,
            isUnder15: 0,
            isUnder3: 0
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are unselectedFor100 ',user);
              res.json({ code: 200 })
           })
}

UserController.unselectFor15 = function(req, res){
  var arr = JSON.parse(req.body.userIds);
  console.log('insied:-- ',arr);
  return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder15: 0,
            isUnder3: 0
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are unselectedFor15 ',user);
              res.json({ code: 200 })
           })
}

UserController.unselectFor3 = function(req, res){
  var arr = JSON.parse(req.body.userIds);
  console.log('insied:-- ',arr);
  return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder3: 0
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are unselectedFor15 ',user);
              res.json({ code: 200 })
           })
}


UserController.postSelectFor15 = function(req, res){
  var arr = JSON.parse(req.body.userIds);
  User
  .count({
     where: {
        isUnder15: 1
     }
  })
  .then(function(result) {
    console.log(result);
    if(result >= 100){
      console.log('Already selectFor15 is full');
    }
    else{
     return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder15: 1
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are selectFor15 ',user);
              res.json({ code: 200 })
           })
    }
  });
}

UserController.postSelectFor3 = function(req, res){
  var arr = JSON.parse(req.body.userIds);
  User
  .count({
     where: {
        isUnder3: 1
     }
  })
  .then(function(result) {
    console.log(result);
    if(result >= 100){
      console.log('Already selectFor3 is full');
    }
    else{
     return Promise.map(arr,function(val){
           console.log('val:- ',val);
          return User.update({
            isUnder3: 1
           },{
            where: {
              id: val
            }
           })})
           .then(function(user){
              console.log('Users are selectFor3 ',user);
              res.json({ code: 200 })
           })
    }
  });
}


module.exports = UserController;