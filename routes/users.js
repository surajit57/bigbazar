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
	res.render('blog.html', {data: UserData });
});

router.get( '/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
router.get( '/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/users/login' }), (req, res) => {
  //  res.apiSuccess( { $redirect : '/#/do-login' }, 'Authenticated with Facebook' );
	res.redirect('/users/home');
 });

router.get('/signup' , UserController.getSignupPage);
router.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/users/login' , successRedirect:'/users/home'}));

router.get('/login', function(req, res){
	// req.flash('info', 'Welcome:------------------------------------------');
	// res.render('userLogin.html');
	res.render('newuserLogin.html');
});

router.get('/forgot', UserController.forgotPassword);
//
// router.post('/forgotpassword', UserController.retrievePassword);

// router.post('/forgot', UserController.retrievePassword);
router.post('/forgot', UserController.retrievePassword);

router.get('/reset/:token', function(req, res) {
	console.log('token:-- ',req.params.token);
	User.findOne({
		where: {
			email: 'hemant_nagarkoti@yahoo.com'
		}
	}).then(function(user){
		if(user){
			res.render('forgot.html', {
				user: req.user
			});
		}else{
			console.log('Password reset token is invalid or has expired.');
			req.flash('error', 'Password reset token is invalid or has expired.');
			return res.render('errorPage.html',{});
		}
		// if(response.isUnder100){
		//   console.log('addRound2 fun');
		//   addRound2(UserId, url, req, res);
		// }else{
		//   console.log('He is not eligible for top 100 round');
		// }
	})

	// User.findOne({ where: { email: 'hemant_nagarkoti@yahoo.com' } }, function(user) {
		// console.log('err:-- ', err);
		// console.log('user:-- ', user);
		// if (!user) {
		// 	req.flash('error', 'Password reset token is invalid or has expired.');
		// 	return res.redirect('/forgot');
		// }
		// res.render('reset', {
		// 	user: req.user
		// });
	// });

  // User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
  //   if (!user) {
  //     req.flash('error', 'Password reset token is invalid or has expired.');
  //     return res.redirect('/forgot');
  //   }
  //   res.render('reset', {
  //     user: req.user
  //   });
  // });


	// var resetPasswordToken = 'd07c543ede5e7c14a6c9f6ed5652807a9ba5c316';
	// if(resetPasswordToken == req.params.token){
	// 	console.log('reset password');
	// 	res.render('forgot.html', {
  //     user: req.user
  //   });
	// }
	// else{
		// console.log('Password reset token is invalid or has expired.');
		// req.flash('error', 'Password reset token is invalid or has expired.');
		// return res.render('errorPage.html',{});
	// }
});

router.get('/error', function(req, res){
	res.render('errorPage.html');
})

// res.render('newuserLogin.html');
router.get('/logout', function(req, res){
		req.session.destroy(function(){
        req.session = null;

        res.clearCookie('express.sid', { path: '/' });
        res.redirect('/users/login');

    });
});

router.get('/blogPost', Auth.isLoggedIn, function(req, res){




	res.render('blog.html');
});
router.post('/blogPost', Auth.isLoggedIn, UserController.postBlog);
// router.get('/blogPost1', Auth.isLoggedIn, UserController.postBlog);

router.get('/list', UserController.getListOfAllUsers);



module.exports = router;
