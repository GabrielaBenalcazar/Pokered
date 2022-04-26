const router = require("express").Router();
const Event = require('./../models/Event.model')
const { isLoggedIn } = require("./../middleware/route-guard");

<<<<<<< HEAD
const { checkRole } = require("./../middleware/route-guard");



///////////////////////////LIST EVENTS
router.get("/events", (req, res, next) => {
=======
router.get("/events", isLoggedIn, (req, res, next) => {
>>>>>>> 038996d7a1ff993f35a986b6e09913fcbef45e62
    Event
        .find()
        .then(allEvents => {
            res.render('./poke-events/list-events', { allEvents })
        })
        .catch(err => err)
});
<<<<<<< HEAD


////////////////////////CREATE EVENTS
router.get("/events/create", checkRole('ADMIN', 'LEADER'), (req, res, next) => {
    res.render('./poke-events/create-event')
=======
router.get("/events/create", isLoggedIn, (req, res, next) => {
    res.render("./poke-events/create-event");
>>>>>>> 038996d7a1ff993f35a986b6e09913fcbef45e62
});

router.post("/events/create", isLoggedIn, (req, res, next) => {
    const { name, details, location, date } = req.body;
    Event.create({ name, details, location, date })
        .then((lastEvent) => {
            res.redirect("/events");
        })
        .catch((err) => err);
});


<<<<<<< HEAD
//////////////////////////////EDIT EVENTS
router.get("/events/:id/edit", (req, res, next) => {
    const { id } = req.params
    Event
        .findById(id)
        .then(editEvent => {
            res.render('./poke-events/edit-event', editEvent)
=======

router.get("/events/:id/edit", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    Event.findById(id)
        .then((editEvent) => {
            res.render("./poke-events/edit-event", editEvent);
>>>>>>> 038996d7a1ff993f35a986b6e09913fcbef45e62
        })
        .catch((err) => err);
});

<<<<<<< HEAD
router.post("/events/:id/edit", (req, res, next) => {
    const { id } = req.params
    const { name, details, location, date } = req.body
    Event
        .findByIdAndUpdate(id, { name, details, location, date })
        .then(lastEvent => {
            res.redirect('/events')
=======

router.post("/events/:id/edit", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    const { name, details, location, date } = req.body;
    Event.findByIdAndUpdate(id, { name, details, location, date })
        .then((lastEvent) => {
            res.redirect("/events");
>>>>>>> 038996d7a1ff993f35a986b6e09913fcbef45e62
        })
        .catch((err) => err);
});

<<<<<<< HEAD
/////////////////////////////DELETE EVENTS
router.post("/events/:id/delete", (req, res, next) => {
    const { id } = req.params
    Event
        .findByIdAndDelete(id)
        .then(lastEvent => {
            res.redirect('/events')
=======
router.post("/events/:id/delete", isLoggedIn, (req, res, next) => {
    const { id } = req.params;
    Event.findByIdAndDelete(id)
        .then((lastEvent) => {
            res.redirect("/events");
>>>>>>> 038996d7a1ff993f35a986b6e09913fcbef45e62
        })
        .catch((err) => console.log(`dando error${err}`));
});

module.exports = router;

