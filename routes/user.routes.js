const router = require("express").Router();

const User = require("../models/User.model");

const { isLoggedIn } = require("./../middleware/route-guard");

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("user/profile", { user: req.session.currentUser });
});

router.get("/profile/:id/edit", isLoggedIn, (req, res) => {

    res.render("user/edit", { user: req.session.currentUser });
});

router.post("/profile/:id/edit", isLoggedIn, (req, res) => {
    const { username, email, password, img } = req.body;
    const { id } = req.params;

    User.findByIdAndUpdate(id, { username, email, password, img })
        .then(
        (user) => {
            r;
        }
    );



});

module.exports = router;
