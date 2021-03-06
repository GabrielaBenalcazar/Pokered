const router = require("express").Router();

const fileUploader = require("./../config/cloudinary.config");

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const ApiService = require("../service/poke.api.service");
const Service = new ApiService();

const User = require("../models/User.model");
const Event = require("../models/Event.model");
const Gym = require("../models/Gym.model");

const { isLoggedIn, checkRole } = require("./../middleware/route-guard");

//PROFILE
router.get("/", isLoggedIn, (req, res, next) => {
    const isLeader = req.session.currentUser.role === "LEADER";
    const isAdmin = req.session.currentUser.role === "ADMIN";
    const userId = req.session.currentUser._id;

    let user;

    User.findById(userId)
        .then((dbUser) => {
            user = dbUser;

            const pokemonDetailsPromises = user.pokemons.map((pokemonName) =>
                Service.getPokemonByName(pokemonName)
            );

            const eventsPromise = Event.find({ participants: userId });

            const gymsPromise = Gym.find().populate("leader");

            return Promise.all([Promise.all(pokemonDetailsPromises), eventsPromise, gymsPromise]);
        })
        .then(([allPokemons, allEvents, allGyms]) => {
            const viewInfo = { allPokemons, allEvents, allGyms };

            console.log(viewInfo);

            res.render("user/profile", { user, isLeader, isAdmin, viewInfo });
        })
        .catch((err) => next(err));
});

///List Users
router.get("/list", isLoggedIn, checkRole("ADMIN"), (req, res, next) => {
    const promise = [User.find({ role: "TRAINER" }), User.find({ role: "LEADER" })];
    Promise.all(promise)
        .then(([trainerUsers, leaderUsers]) => {
            res.render("user/list-user", { trainerUsers, leaderUsers });
        })
        .catch((err) => next(err));
});
////EDIT TO LEADER

router.post("/list/:id/editToLeader", (req, res, next) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, { role: "LEADER" })
        .then((toLeader) => {
            res.redirect("/profile/list");
        })
        .catch((err) => next(err));
});
////EDIT TO TRAINER

router.post("/list/:id/editToTranier", (req, res, next) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, { role: "TRAINER" })
        .then((toLeader) => {
            res.redirect("/profile/list");
        })
        .catch((err) => next(err));
});

///EDIT PROFILE
router.get("/:id/edit", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then((oneUser) => {
            res.render("user/edit", oneUser);
        })
        .catch((err) => next(err));
});

router.post("/:id/edit", fileUploader.single("imgFile"), isLoggedIn, (req, res, next) => {
    const { username, email, userPassword, img } = req.body;
    const { id } = req.params;
    const { path } = req.file;

    bcryptjs
        .genSalt(saltRounds)
        .then((salt) => bcryptjs.hash(userPassword, salt))
        .then((hashedPassword) =>
            User.findByIdAndUpdate(id, { username, email, password: hashedPassword, img: path })
        )
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

//GYM LEADER

router.get("/gym", isLoggedIn, checkRole("ADMIN", "LEADER"), (req, res, next) => {
    id = req.session.currentUser._id;

    const eventAndGymsPrm = [Event.find({ leader: id }), Gym.find({ leader: id })]

    Promise
        .all(eventAndGymsPrm)
        .then(([allEvent, Gym]) => {

            res.render("user/gym", { allEvent, Gym });
        })
        .catch((err) => next(err));
});

module.exports = router;
