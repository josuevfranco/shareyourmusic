function guestMiddleware(req, res, next){
    if(req.session.userLogged){
        //If the user is logged
        return res.redirect('/user/profile')
    }

    next();
}

module.exports = guestMiddleware;