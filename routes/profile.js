var express = require('express');
var router = express.Router();

var passport = require('passport');
var _ = require('lodash');
var  UserController = require('../controllers/user_controller');

var Auth = require('../lib/auth');



var router = express.Router();
require('../lib/passport.js')(passport);


router.get('/', Auth.isLoggedIn, function(req, res){
	// res.render('adminPanel1/index.html');
	console.log('I am at profile page');
	// res.redirect('/admin/allBlogs');
});

module.exports = router;
