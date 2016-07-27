var express = require('express');
var router = express.Router();

var passport = require('passport');
var _ = require('lodash');
var  UserController = require('../controllers/user_controller');

var Auth = require('../lib/auth');



var router = express.Router();
require('../lib/passport.js')(passport);


router.get('/home', Auth.isAdminLogin, function(req, res){
	// res.render('adminPanel1/index.html');
	res.redirect('/admin/allBlogs');
});

router.get('/login', function(req, res){
	res.render('adminPanel1/signin.html');
});

router.get('/signup' , UserController.getAdminSignupPage)
router.post('/signup', passport.authenticate('local-admin-signup', {failureRedirect: '/admin/signup' , successRedirect:'/admin/home'}));

router.get('/allBlogs', Auth.isAdminLogin, UserController.getAllBlogs);

router.get('/select-for-100', Auth.isAdminLogin, UserController.selectFor100);

module.exports = router;
