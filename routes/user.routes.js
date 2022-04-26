const router = require("express").Router();

const User = require("../models/User.model");

const { isLoggedIn } = require("./../middleware/route-guard");

const { checkRole } = require("./../middleware/route-guard");

///profile User

router.get("/profile", isLoggedIn, (req, res, next) => {
    const isLeader = req.session.currentUser.role === 'LEADER'

    res.render("user/profile", { user: req.session.currentUser, isLeader });
});


///EDIT PROFILE
router.get("/profile/:id/edit", isLoggedIn, (req, res, next) => {
    res.render("user/edit", { user: req.session.currentUser });
});

router.post("/profile/:id/edit", isLoggedIn, (req, res, next) => {
    const { username, email, password, img } = req.body;
    const { id } = req.params;

    console.log({ username, email, password, img }, id);

    User
        .findByIdAndUpdate(id, { username, email, password, img })
        .then(() => {
            res.redirect("/profile");
        });
});


///DELETE USER
router.post("/profile/:id/delete", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect("/register");
        });
});


////GYM LEADER and ADMIN ONLY
router.get("/profile/gym", isLoggedIn, checkRole('ADMIN', 'LEADER'), (req, res, next) => {

    res.render('user/gym')

});
module.exports = router;
