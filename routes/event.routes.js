const router = require("express").Router();
const fileUploader = require('./../config/cloudinary.config')

const Event = require("./../models/Event.model");
const User = require("../models/User.model");
const ApiService = require("./../service/poke.api.service");
const Service = new ApiService();

const { isLoggedIn, checkRole } = require("./../middleware/route-guard");

//LIST EVENTS
router.get("/", (req, res, next) => {
    Event.find()
        .then((allEvents) => {
            res.render("./poke-events/list-events", { allEvents });
        })
        .catch((err) => next(err));
});

//CREATE EVENTS
router.get("/create", checkRole("ADMIN", "LEADER"), (req, res, next) => {
    Service.getAllPokemons()
        .then((pokemons) => {
            res.render("./poke-events/create-event", { pokemons });
        })
        .catch((err) => next(err));
});

router.post("/create", fileUploader.single('imgFile'), isLoggedIn, (req, res, next) => {
    const leader = req.session.currentUser._id;
    const { name, details, location, date, pokemon1, pokemon2 } = req.body;
    const { path } = req.file;

    let pokemons = [pokemon1, pokemon2];


    Event.create({ name, details, location, date, img: path, leader, pokemons })
        .then(() => {
            res.redirect("/events");
        })
        .catch((err) => next(err));
});

//EDIT EVENTS

router.get("/:id/edit", (req, res, next) => {
    const { id } = req.params;
    Event.findById(id)
        .then((editEvent) => {
            res.render("./poke-events/edit-event", editEvent);
        })
        .catch((err) => next(err));
});

router.post("/:id/edit", fileUploader.single('imgFile'), (req, res, next) => {
    const { id } = req.params;
    const { name, details, location, date } = req.body;
    const { path } = req.file;;
    Event.findByIdAndUpdate(id, { name, details, location, date, img: path })
        .then((lastEvent) => {
            res.redirect("/events");
        })
        .catch((err) => next(err));
});

//DELETE EVENTS

router.post("/:id/delete", (req, res, next) => {
    const { id } = req.params;
    Event.findByIdAndDelete(id)
        .then((lastEvent) => {
            res.redirect("/events");
        })
        .catch((err) => next(err));
});

//METER PARTICIPANTES EN EVENTOS

router.post("/:id", (req, res, next) => {
    const user = req.session.currentUser._id;
    const { id } = req.params;
    Event.findByIdAndUpdate(id, { $addToSet: { participants: user } })
        .then((event) => {
            res.redirect("/profile");
        })
        .catch((err) => next(err));
});


////dar pokemons por LEADER

router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    Event
        .findById(id)
        .populate('participants')
        .then((event) => {
            res.render("./poke-events/event-details", event);
        })
        .catch((err) => next(err));
});



router.post("/:idEvent/give-pokemons/:idUser", (req, res, next) => {

    const { idUser } = req.params;
    const { idEvent } = req.params;

    Event
        .findById(idEvent)
        .then(event => {


            const { pokemons } = event
            return User.findByIdAndUpdate(idUser, { $addToSet: { pokemons } });
        })
        .then(() => {
            res.redirect("/profile")
        })
        .catch((err) => next(err));
});



module.exports = router;
