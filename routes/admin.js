var express = require('express');
var router = express.Router();

var passport = require('passport');
var _ = require('lodash');
var  UserController = require('../controllers/user_controller');

var Auth = require('../lib/auth');



var router = express.Router();
require('../lib/passport.js')(passport);


router.get('/home', Auth.isAdminLogin, function(req, res){
	// res.render('adminPanel1/index.html');
	console.log('coming here');
	res.redirect('/admin/allBlogs');
});

router.get('/login', function(req, res){
	res.render('adminPanel1/signin.html');
});

router.get('/signup' , UserController.getAdminSignupPage)
router.post('/signup', passport.authenticate('local-admin-signup', {failureRedirect: '/admin/signup' , successRedirect:'/admin/home'}));

router.get('/logout', function(req, res){
		req.session.destroy(function(){
        req.session = null;

        res.clearCookie('express.sid', { path: '/' });
        res.redirect('/admin/login');

    });
})

router.get('/allBlogs', Auth.isAdminLogin, UserController.getAllBlogs);

router.post('/select-for-100', Auth.isAdminLogin, UserController.postSelectFor100);
router.post('/unselect-for-100', Auth.isAdminLogin, UserController.unselectFor100);

router.post('/select-for-15', Auth.isAdminLogin, UserController.postSelectFor15);
router.post('/unselect-for-15', Auth.isAdminLogin, UserController.unselectFor15);

router.post('/select-for-3', Auth.isAdminLogin, UserController.postSelectFor3);
router.post('/unselect-for-3', Auth.isAdminLogin, UserController.unselectFor3);


module.exports = router;
