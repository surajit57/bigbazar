var express = require('express');
var router = express.Router();

var passport = require('passport');
var _ = require('lodash');
var  UserController = require('../controllers/user_controller');

var auth = require('../lib/auth');



var router = express.Router();
require('../lib/passport.js')(passport);

/* GET users listing. */
router.get('/', auth.isLoggedIn, function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res){
	res.render('userLogin.html');
})


router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login'}), function(req, res){
	res.render("blog.html")
});

router.get('/home', function(req, res){
	res.render('blog.html');
})
router.post('/home', function(req, res){
	console.log('url:- ', req.body.blog_url);
})


router.get('/signup' , UserController.getSignupPage)
router.post('/signup', UserController.postSignup);

module.exports = router;
