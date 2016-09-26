var express = require('express');
var router = express.Router();


var passport = require('passport');
var  UserController = require('../controllers/user_controller');

var Auth = require('../lib/auth');

var router = express.Router();
require('../lib/passport.js')(passport);

var models = require('../models');
var User = models.user;

router.get('/home', Auth.isLoggedIn , function(req, res){
	var UserData = req.user;
	req.flash('info', req.user.isBlogAdded)
	// res.render('blog.html', {data: UserData });
	res.render('homeBlog.html', {data: UserData });
});



router.get( '/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
router.get( '/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/blogstar/users/login' }), (req, res) => {
  //  res.apiSuccess( { $redirect : '/#/do-login' }, 'Authenticated with Facebook' );
	res.siteRediret('/users/home');
 });

router.get('/signup' , UserController.getSignupPage);
router.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/blogstar/users/login' , successRedirect:'/blogstar/users/home'}));

router.get('/login', function(req, res){
	// req.flash('info', 'Welcome:------------------------------------------');
	// res.render('userLogin.html');
	// res.render('newuserLogin.html');
	// console.log('mountPath:------------------',express.locals);
	res.siteRediret('/');
});

router.get('/forgot', UserController.forgotPassword);

router.post('/forgot', UserController.retrievePassword);

router.get('/reset/:token', function(req, res) {
	console.log('token:-- ',req.params.token);
	User.findOne({
		where: {
			resetPasswordToken: req.params.token,
			resetPasswordExpires: { $gt: Date.now() }
		}
	}).then(function(user){
		if(user){
			// console.log('user for retrieve pass', user);
			// res.render('reset.html', {
			// 	user: user
			// });
			res.render('reset1.html', {
				user: user
			});
		}else{
			console.log('Password reset token is invalid or has expired.');
			req.flash('error', 'Password reset token is invalid or has expired.');
			return res.render('errorPage.html',{});
		}
	})
});
// router.get('/reset1',  function(req, res){
// 	res.render('reset1.html');
//
// });

router.post('/reset/:token', UserController.resetPassword);


router.get('/error', function(req, res){
	res.render('errorPage.html');
})

// res.render('newuserLogin.html');
router.get('/logout', function(req, res){
		req.session.destroy(function(){
        req.session = null;

        res.clearCookie('express.sid', { path: '/' });
        res.siteRediret('/');

    });
});

router.get('/blogPost', Auth.isLoggedIn, function(req, res){
	res.render('blog.html');
	// res.render('homeBlog.html');
});
router.post('/blogPost', Auth.isLoggedIn, UserController.postBlog);
// router.get('/blogPost1', Auth.isLoggedIn, UserController.postBlog);

router.get('/list', UserController.getListOfAllUsers);



module.exports = router;
