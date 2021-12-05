//Application middleware

function userLoggedMiddleware(req, res, next) {
    //We are gonna use a local variable
    //We are using an application middleware so this variable is gonna available in the whole app
    res.locals.isLogged = false;

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        //Global local variable
        res.locals.userLogged = req.session.userLogged;
    }


    next();
}

module.exports = userLoggedMiddleware;