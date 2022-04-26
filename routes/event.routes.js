const router = require("express").Router();
const Event = require("./../models/Event.model");
const User = require("../models/User.model");

const ApiService = require("./../service/poke.api.service");

const Service = new ApiService();

const { isLoggedIn, checkRole } = require("./../middleware/route-guard");

///////////////////////////LIST EVENTS
router.get("/events", (req, res, next) => {
    Event.find()
        .then((allEvents) => {
            res.render("./poke-events/list-events", { allEvents });
        })
        .catch((err) => err);
});

////////////////////////CREATE EVENTS
router.get("/events/create", checkRole("ADMIN", "LEADER"), (req, res, next) => {
    Service.getAllPokemons()
        .then((pokemons) => {
            res.render("./poke-events/create-event", { pokemons });
        })
        .catch((error) => next(error));
});

router.post("/events/create", isLoggedIn, (req, res, next) => {
    const leader = req.session.currentUser._id;
    const { name, details, location, date, pokemon1, pokemon2 } = req.body;
    let pokemons = [pokemon1, pokemon2];

    Event.create({ name, details, location, date, leader, pokemons })
        .then((lastEvent) => {
            res.redirect("/events");
        })
        .catch((error) => next(error));
});

//////////////////////////////EDIT EVENTS
router.get("/events/:id/edit", (req, res, next) => {
    const { id } = req.params;
    Event.findById(id)
        .then((editEvent) => {
            res.render("./poke-events/edit-event", editEvent);
        })
        .catch((error) => next(error));
});

router.post("/events/:id/edit", (req, res, next) => {
    const { id } = req.params;
    const { name, details, location, date } = req.body;
    Event.findByIdAndUpdate(id, { name, details, location, date })
        .then((lastEvent) => {
            res.redirect("/events");
        })
        .catch((error) => next(error));
});

/////////////////////////////DELETE EVENTS
router.post("/events/:id/delete", (req, res, next) => {
    const { id } = req.params;
    Event.findByIdAndDelete(id)
        .then((lastEvent) => {
            res.redirect("/events");
        })
        .catch((error) => next(error));
});

///METER PARTICIPANTES EN EVENTOS

router.post("/profile/:id", (req, res, next) => {
    const user = req.session.currentUser._id;
    const { id } = req.params;
    Event.findByIdAndUpdate(id, { $addToSet: { participants: user } })
        .then((event) => {
            const pokemons = event.pokemons;

            return User.findByIdAndUpdate(user, {
                $addToSet: { pokemons: pokemons },
            });
        })
        .then(() => {
            res.redirect("/profile");
        })
        .catch((error) => next(error));
});

module.exports = router;
