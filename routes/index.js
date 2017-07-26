var express = require('express');
var router = express.Router();
var passport = require('passport');
var  UserController = require('../controllers/user_controller');
var Auth = require('../lib/auth');
var config = require('../config/index');

var middleWarePath = config.siteRoot;

require('../lib/passport.js')(passport);

if(process.env.NODE_ENV == "production") {
	middleWarePath = config.siteRoot
} else {
	middleWarePath = config.localsiteRoot ? config.localsiteRoot : '/';
}
/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log('user:------------ ',req.user.id);

	if(req.user){
		// res.siteRediret('/users/home');
		res.siteRediret('/users');
	}

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
router.post(middleWarePath + '/login', passport.authenticate('local-login', {failureRedirect: '/blogstar/users/login'}),function(req, res){
	console.log('req.user.isAdmin:-- ',req.user.isAdmin);
	if(req.user.isAdmin){
		return res.siteRediret('/admin/home');
	}
	return res.siteRediret('/users')
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
