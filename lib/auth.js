var Auth ={}

Auth.isLoggedIn = function(req, res, next ){

	if(req.isAuthenticated()){
		return next();
	}
	return res.redirect('/users/login');
}

module.exports = Auth;