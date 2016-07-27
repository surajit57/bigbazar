var express = require('express');
var router = express.Router();

var passport = require('passport');
var _ = require('lodash');
var  UserController = require('../controllers/user_controller');

var Auth = require('../lib/auth');



var router = express.Router();
require('../lib/passport.js')(passport);

/* GET users listing. */
router.get('/', Auth.isLoggedIn, function(req, res, next) {
  // res.send('respond with a resource');
  	res.redirect('/users/home');
});

router.get('/login', function(req, res){
	res.render('userLogin.html');
})

router.get('/admin/login', function(req, res){
	res.render('adminPanel/signin.html');
});


router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login'}), function(req, res){
	console.log('Login succesful');
	console.log('req.session: ', req.session);
	res.redirect('/users/home');
});

router.get('/home', Auth.isLoggedIn , function(req, res){
	res.render('blog.html');
});


router.get('/admin/home', function(req, res){
	res.render('adminPanel/index.html');
});

router.post('/home', function(req, res){
	console.log('url:- ', req.body.blog_url);
	// res.redirect('/users/home');
});


router.get('/signup' , UserController.getSignupPage);
router.get('/admin/signup' , UserController.getAdminSignupPage)
router.post('/signup', UserController.postSignup);
router.post('/blogPost', Auth.isLoggedIn, UserController.postBlog);

module.exports = router;
