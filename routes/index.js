var express = require('express');
var router = express.Router();
var passport = require('passport');
var  UserController = require('../controllers/user_controller');
var Auth = require('../lib/auth');
var router = express.Router();

require('../lib/passport.js')(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log('user:------------ ',req.user.id);

	if(req.user){
		res.redirect('/users/home');
	}

	res.render('newuserLogin.html');
});

router.post('/login', passport.authenticate('local-login', {failureRedirect: '/blogstar/users/login'}),function(req, res){
	if(req.user.isAdmin){
		return res.redirect('/admin/home');
	}
	return res.redirect('/users/home')
});

router.post('/admin/login', passport.authenticate('local-login', {failureRedirect: '/blogsta/admin/login'}),function(req, res){
	// if(req.user.isAdmin){

		return res.redirect('/admin/home');
	// }
	// return res.redirect('/users/home')
});

router.get('/logout', function(req, res){
	 req.logout();
	req.flash('success', "<div class='container'>You are now logged out</div>");
  	return res.redirect('/users/login');
})

module.exports = router;
