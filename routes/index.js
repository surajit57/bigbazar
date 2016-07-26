var express = require('express');
var router = express.Router();
var models = require('../models');
var User = models.User; 

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/users/home');
});



module.exports = router;
