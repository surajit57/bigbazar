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
            req.flash('info', 'Blog sucessfully posted');
            return res.redirect('/users/home') 
          });
    });
};


UserController.getAdminSignupPage = function(req, res){
  res.render('adminPanel1/signup.html');
}


UserController.getAllBlogs = function(req, res){
    Blog.findAll({include:[{ model: models.user }]}).then(function(allblogs) {
    res.render('adminPanel1/index.html', {blogs: allblogs});
  });
}
UserController.selectFor100 = function(req, res){

  User.count({ where: { isUnder100: 1 }})
  .then(function(result) {
    if(result >= 100){
      console.log('Already selectFor100 is full');
    }
    else{
      return Promise.map([28, 30],function(val){
        return User.update({ isUnder100: 1} ,
        {
          where: { id: val }
         })
      })
      .then(function(user){
        console.log('Users are selectFor100 ',user);
      })
    }
  });
}


module.exports = UserController;