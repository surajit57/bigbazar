var express = require('express');
var router = express.Router();
var passport = require('passport');
var  UserController = require('../controllers/user_controller');
var Auth = require('../lib/auth');
var config = require('../config/index');

require('../lib/passport.js')(passport);


/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log('user:------------ ',req.user.id);

	if(req.user){
		// res.siteRediret('/users/home');
		res.siteRediret('/users');
	}
	console.log('coming');
	res.render('newuserLogin.html');
});

// router.post('/login', passport.authenticate('local-login', {failureRedirect: '/blogstar/home/users/login'}),function(req, res){
// 	console.log('req.user.isAdmin:-- ',req.user.isAdmin);
// 	if(req.user.isAdmin){
// 		return res.siteRediret('/admin/home');
// 	}
// 	return res.siteRediret('/users/home')
// });
console.log('env:- ', process.env.NODE_ENV);
console.log('path:- ', router.locals);
router.post('/login', passport.authenticate('local-login', {failureRedirect: 'http://104.236.84.1/blogstar/users/login'}),function(req, res){
	console.log('req.user.isAdmin:-- ',req.user.isAdmin);
	if(req.user.isAdmin){
		return res.siteRediret('/admin/home');
	}
	return res.siteRediret('/users/home')
});

// router.post('/admin/login', passport.authenticate('local-login', {failureRedirect: '/blogstar/home/admin/login'}),function(req, res){
// 	// if(req.user.isAdmin){
//
// 		return res.siteRediret('/admin/home');
// 	// }
// 	// return res.redirect('/users/home')
// });
router.post('/admin/login', passport.authenticate('local-login', {failureRedirect: '/blogstar/admin/login'}),function(req, res){
	// if(req.user.isAdmin){

		return res.siteRediret('/admin/home');
	// }
	// return res.redirect('/users/home')
});

router.get('/logout', function(req, res){
	 req.logout();
	req.flash('success', "<div class='container'>You are now logged out</div>");
  	return res.siteRediret('/users/login');
})

module.exports = router;
