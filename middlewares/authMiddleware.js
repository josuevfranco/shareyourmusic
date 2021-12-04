function authMiddleware(req, res, next){
    if(!req.session.userLogged){
        //If there is not a user logged it is going to redirec to you to the login page
        return res.redirect('/user/login')
    }

    next();
}

module.exports = authMiddleware;