var express = require('express');
var router = express.Router();
var passport = require('passport');
var  UserController = require('../controllers/user_controller');
var Auth = require('../lib/auth');
var router = express.Router();

require('../lib/passport.js')(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/users/home');
});

router.post('/login', passport.authenticate('local-login', {failureRedirect: '/users/login'}),function(req, res){
	if(req.user.isAdmin){
		return res.redirect('/admin/home');
	}
	return res.redirect('/user/home')
});

module.exports = router;
