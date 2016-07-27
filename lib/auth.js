var Auth ={}

Auth.isLoggedIn = function(req, res, next ){

	if(req.isAuthenticated()){
		return next();
	}
	return res.redirect('/users/login');
}

Auth.isAdminLogin = function(req, res, next ){
	if(req.isAuthenticated() && req.user.isAdmin){
		return next();
	}
	return res.redirect('/admin/login');
}

module.exports = Auth;