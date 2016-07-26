var Auth ={}

Auth.isLoggedIn = function(req, res, next ){
	console.log(req.session , "----------------------")
	if(req.user){
		return next();
	}
	else{
		return res.redirect('/users/login');
	}
}

module.exports = Auth;