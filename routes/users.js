var express = require('express');
var passport = require('passport');
var _ = require('lodash');


var router = express.Router();
require('../lib/passport.js')(passport);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', fucntion(req, res){
  res.render('signup')
})
router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}, function(req, res){
	console.log('user detail: - ', req);
})
);

module.exports = router;
