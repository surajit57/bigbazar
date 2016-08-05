var express = require('express');
var router = express.Router();

var passport = require('passport');
var  UserController = require('../controllers/user_controller');

var Auth = require('../lib/auth');

var router = express.Router();
require('../lib/passport.js')(passport);

router.get('/home', Auth.isLoggedIn , function(req, res){
	var UserData = req.user;
	req.flash('info', req.user.isBlogAdded)
	res.render('blog.html', {data: UserData });
});

router.get('/signup' , UserController.getSignupPage);
router.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/users/login' , successRedirect:'/users/home'}));

router.get('/login', function(req, res){
	// req.flash('info', 'Welcome:------------------------------------------');
	res.render('userLogin.html');
});

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
