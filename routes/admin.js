var express = require('express');
var router = express.Router();

var passport = require('passport');
var _ = require('lodash');
var  UserController = require('../controllers/user_controller');

var Auth = require('../lib/auth');



var router = express.Router();
require('../lib/passport.js')(passport);


router.get('/home', function(req, res){
	res.render('adminPanel/index.html');
});

router.get('/login', function(req, res){
	res.render('adminPanel/signin.html');
});

router.get('/signup' , UserController.getAdminSignupPage)
router.post('/signup' , UserController.postAdminSignupPage);


module.exports = router;
