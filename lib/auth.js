var auth ={

}

auth.isLoggedIn = function(req, res, next ){
	if(req.user){
		next();
	}
	else{
		res.redirect('/users/login');
	}
}

module.exports = auth;