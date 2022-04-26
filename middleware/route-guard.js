const isLoggedIn = (req, res, next) => {
    console.log("---VAMOS A COMPROBAR LA SESIÓN---->", req.session);
    !req.session.currentUser ? res.redirect("/login") : next();
};

const isLoggedOut = (req, res, next) => {
    req.session.currentUser ? res.redirect("/") : next();
};



const checkRole = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('user/profile', { errorMessage: 'No tienes permisos' })
    }
}



module.exports = { isLoggedIn, isLoggedOut, checkRole };
