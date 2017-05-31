var express = require('express');
var router = express.Router();
var passport = require('passport');
var  UserController = require('../controllers/user_controller');
var Auth = require('../lib/auth');

var routePrefix = '/home';

require('../lib/passport.js')(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log('user:------------ ',req.user.id);

	if(req.user){
		res.siteRediret(routePrefix + '/users/home');
	}

	res.render('newuserLogin.html');
});

router.post(routePrefix + '/login', passport.authenticate('local-login', {failureRedirect: '/blogstar/home/users/login'}),function(req, res){
	console.log('req.user.isAdmin:-- ',req.user.isAdmin);
	if(req.user.isAdmin){
		return res.siteRediret(routePrefix + '/admin/home');
	}
	return res.siteRediret( routePrefix + '/users/home')
});

router.post(routePrefix + '/admin/login', passport.authenticate('local-login', {failureRedirect: '/blogstar/home/admin/login'}),function(req, res){
	// if(req.user.isAdmin){

		return res.siteRediret(routePrefix + '/admin/home');
	// }
	// return res.redirect('/users/home')
});

router.get(routePrefix + '/logout', function(req, res){
	 req.logout();
	req.flash('success', "<div class='container'>You are now logged out</div>");
  	return res.siteRediret(routePrefix + '/users/login');
})

module.exports = router;
