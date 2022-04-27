const router = require("express").Router();

const User = require("../models/User.model");
const Event = require("../models/Event.model");

const { isLoggedIn, checkRole } = require("./../middleware/route-guard");

//PROFILE

router.get("/", isLoggedIn, (req, res, next) => {
    const isLeader = req.session.currentUser.role === "LEADER";
    const user = req.session.currentUser;
    const { _id } = req.session.currentUser;

    Event.find({ participants: _id })
        .then((allEvents) => {
            res.render("user/profile", { user, isLeader, allEvents });
        })
        .catch((err) => next(err));
});

//EDIT PROFILE

router.get("/:id/edit", isLoggedIn, (req, res, next) => {
    res.render("user/edit", { user: req.session.currentUser });
});

router.post("/:id/edit", isLoggedIn, (req, res, next) => {
    const { username, email, password, img } = req.body;
    const { id } = req.params;

    User.findByIdAndUpdate(id, { username, email, password, img })
        .then(() => {
            res.redirect("/profile");
        })
        .catch((err) => next(err));
});

//DELETE USER

router.post("/:id/delete", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/register");
        })
        .catch((err) => next(err));
});

//GYM LEADER and ADMIN ONLY

router.get("/gym", isLoggedIn, checkRole("ADMIN", "LEADER"), (req, res, next) => {
    id = req.session.currentUser._id;

    Event.find({ leader: id })
        .then((allEvent) => {
            res.render("user/gym", { allEvent });
        })
        .catch((err) => next(err));
});
module.exports = router;
