const router = require("express").Router();

const User = require("../models/User.model");

const { isLoggedIn } = require("./../middleware/route-guard");

router.get("/profile", isLoggedIn, (req, res, next) => {
    res.render("user/profile", { user: req.session.currentUser });
});

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

router.post("/profile/:id/delete", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    User
        .findByIdAndDelete(id)
        .then(() => {
        res.redirect("/register");
    });
});

module.exports = router;
