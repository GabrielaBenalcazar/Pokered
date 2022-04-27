const router = require("express").Router();
const bcrypt = require("bcryptjs/dist/bcrypt");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const User = require("../models/User.model");
const Event = require("../models/Event.model");

const { isLoggedIn } = require("./../middleware/route-guard");

const { checkRole } = require("./../middleware/route-guard");

///profile User

router.get("/profile", isLoggedIn, (req, res, next) => {
    const isLeader = req.session.currentUser.role === 'LEADER'
    const isAdmin = req.session.currentUser.role === 'ADMIN'
    const user = req.session.currentUser
    const { _id } = req.session.currentUser
    Event
        .find({ participants: _id })
        .then(allEvents => {
            res.render("user/profile", { user, isLeader, allEvents, isAdmin });
        })
        .catch((error) => next(error))
});



router.get("/profile/list", isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const promise = [User.find({ role: 'TRAINER' }), User.find({ role: 'LEADER' })]
    Promise
        .all(promise)
        .then(([trainerUsers, leaderUsers]) => {
            res.render('user/list-user', { trainerUsers, leaderUsers })
        })
        .catch(err => next(err))
});

///EDIT PROFILE
router.get("/profile/:id/edit", isLoggedIn, (req, res, next) => {

    const { id } = req.params
    User
        .findById(id)
        .then(oneUser => {
            res.render("user/edit", oneUser);
        })
        .catch(err => next(err))


});

router.post("/profile/:id/edit", isLoggedIn, (req, res, next) => {
    const { username, email, userPassword, img } = req.body;
    const { id } = req.params;


    bcryptjs

        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(userPassword, salt))
        .then(hashedPassword => User.findByIdAndUpdate(id, { username, email, password: hashedPassword, img }))
        .then(() => {
            res.redirect("/profile");
        })
        .catch((error) => next(error));
});





///DELETE USER
router.post("/profile/:id/delete", isLoggedIn, (req, res, next) => {
    const { id } = req.params;

    User.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/register");
        })
        .catch((error) => next(error));
});

////GYM LEADER and ADMIN ONLY
router.get("/profile/gym", isLoggedIn, checkRole("ADMIN", "LEADER"),
    (req, res, next) => {
        id = req.session.currentUser._id;

        Event.find({ leader: id })
            .then((allEvent) => {
                res.render("user/gym", { allEvent });
            })
            .catch((error) => next(error));
    }
);
module.exports = router;


