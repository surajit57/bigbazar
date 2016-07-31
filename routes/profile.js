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
		  // req.flash('info', 'Image Uploaded');
              // res.render('newprofile.html');
              res.redirect('/users/profile');
		  // res.json({code: 200, message: "Image Uploaded Sucessfully"})
      }
      else{
      	res.json({code: 0, message: "Technical Error while uploading profile."})
      }
});


// router.post('/upload', multer({
//       dest: './public/pro/',
//       changeDest: function(dest, req, res){
//             var newDestination = dest;
//             var stat = null;
//             try{
//                   stat = fs.statSync(newDestination);
//             } catch(err){
//                   fs.mkdirSync(newDestination);
//             }
//             if(stat && !stat.isDirectory()) {
//                   throw new Error('newDestination cannot be created because an inode of a different type exists at ');
//             }
//             return newDestination;
//       }
// }), function(req, res){
//       res.json({"code": 200, "status": req.files});
// })


// router.post('/upload/image',multer({
//       dest: './public/pro1',
//       changeDest: function(dest, req, res){
//             var newDestination = dest;
//             console.log('new Destination');
//             var stat = null;
//             try{
//                   stat = fs.statSync(newDestination);
//             } catch (err) {
//                   throw new Error('Directory cannot be created  "' + dest + '" ');
//             }
//             return newDestination;
//       }
// }), function(req, res){
//       console.log('file uploaded ');
// });



module.exports = router;
