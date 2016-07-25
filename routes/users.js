var express = require('express');
var router = express.Router();

var passport = require('passport');
var _ = require('lodash');
var bcrypt = require('bcrypt');
var  UserController = require('../controllers/user_controller');

var router = express.Router();
require('../lib/passport.js')(passport);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res ){
	res.render('signin.html');
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login'}), function(req, res){
	console.log('user detail: - ', req);
});

router.get('/signup' , UserController.postSignup);

module.exports = router;
