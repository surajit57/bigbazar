var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.user; 
var Blog = models.blog;
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

router.get('/', Auth.isLoggedIn, UserController.getProfile);
router.post('/', Auth.isLoggedIn, UserController.saveProfile);

router.post('/updatepassword', Auth.isLoggedIn, UserController.changePassword);

router.post('/upload',Auth.isLoggedIn, type, function (req, res) {
      console.log('image upload:::---------------------- ', req.file);
      if(req.file){
      	  var tmp_path = req.file.path;
		  var target_path = 'public/profile/' + req.file.originalname;
		  console.log('tmp_path:-- ',tmp_path);
		  console.log('target_path:-- ', target_path);
              console.log('req.file name:- ',req.file.filename);
              console.log('req.user:- ',req.user);

              var user = User.update({
                  imageUrl: 'http://localhost:3000/profile/'+req.file.filename,
                },{
                  where: {
                    id: req.user.id
                  }
                }).then(function(val){
                  console.log('val:-- ',val);
                  req.flash('info', 'Image Uploaded');
                  res.redirect('/users/profile');
                })
      }
      else{
      	res.json({code: 0, message: "Technical Error while uploading profile."})
      }
});

module.exports = router;
