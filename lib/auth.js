var Auth ={}

Auth.isLoggedIn = function(req, res, next ){

	if(req.isAuthenticated()){
		return next();
	}
	return res.siteRediret('/users/login');
}

Auth.isAdminLogin = function(req, res, next ){
	if(req.isAuthenticated() && req.user.isAdmin){
		return next();
	}
	return res.siteRediret('/admin/login');
}

module.exports = Auth;
