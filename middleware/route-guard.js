const isLoggedIn = (req, res, next) => {
    console.log("---VAMOS A COMPROBAR LA SESIÓN---->", req.session);
    !req.session.currentUser ? res.redirect("/login") : next();
};

const isLoggedOut = (req, res, next) => {
    req.session.currentUser ? res.redirect("/") : next();
};

module.exports = { isLoggedIn, isLoggedOut };
