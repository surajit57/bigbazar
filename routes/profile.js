var express = require('express');
var router = express.Router();

var passport = require('passport');
var _ = require('lodash');
var  UserController = require('../controllers/user_controller');

var Auth = require('../lib/auth');

var multer  = require('multer');
var upload = multer({ dest: 'public/profile/'});
var fs = require('fs');
var type = upload.single('displayImage');



var router = express.Router();
require('../lib/passport.js')(passport);


router.get('/',Auth.isLoggedIn, function(req, res){
	console.log('I am at profile page');
	// res.redirect('/admin/allBlogs');
	res.render('profile.html');
});


router.post('/upload',Auth.isLoggedIn, type, function (req, res) {
      console.log('image upload:::---------------------- ', req.file);
      if(req.file){
      	  var tmp_path = req.file.path;
		  var target_path = 'public/profile/' + req.file.originalname;
		  console.log('tmp_path:-- ',tmp_path);
		  console.log('target_path:-- ', target_path);
		  // req.flash('info', 'Image Uploaded');
		  res.json({code: 200, message: "Image Uploaded Sucessfully"})
      }
      else{
      	res.json({code: 0, message: "Technical Error while uploading profile."})
      }
});



module.exports = router;
