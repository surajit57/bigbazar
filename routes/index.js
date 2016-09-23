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
		res.redirect('/blogstar/users/home');
	}
	console.log('coming here ...................');

	console.log('res val:-- ', res);
	console.log('headers:-- ', req.headers.host);
	res.render('newuserLogin.html');
});

router.post('/login', passport.authenticate('local-login', {failureRedirect: '/blogstar/users/login'}),function(req, res){
	if(req.user.isAdmin){
		return res.redirect('/blogstar/admin/home');
	}
	return res.redirect('/blogstar/users/home')
});

router.post('/adminlogin', passport.authenticate('local-login', {failureRedirect: '/blogstar/admin/login'}),function(req, res){
	// if(req.user.isAdmin){

		return res.redirect('/blogstar/admin/home');
	// }
	// return res.redirect('/users/home')
});

router.get('/logout', function(req, res){
	 req.logout();
	req.flash('success', "<div class='container'>You are now logged out</div>");
  	return res.redirect('/blogstar/users/login');
})

module.exports = router;
