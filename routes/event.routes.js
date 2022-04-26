const router = require("express").Router();
const Event = require('./../models/Event.model')

const { checkRole } = require("./../middleware/route-guard");



///////////////////////////LIST EVENTS
router.get("/events", (req, res, next) => {
    Event
        .find()
        .then(allEvents => {
            res.render('./poke-events/list-events', { allEvents })
        })
        .catch(err => err)
});


////////////////////////CREATE EVENTS
router.get("/events/create", checkRole('ADMIN', 'LEADER'), (req, res, next) => {
    res.render('./poke-events/create-event')
});

router.post("/events/create", (req, res, next) => {
    const { name, details, location, date } = req.body
    Event
        .create({ name, details, location, date })
        .then(lastEvent => {
            res.redirect('/events')
        })
        .catch(err => err)
});


//////////////////////////////EDIT EVENTS
router.get("/events/:id/edit", (req, res, next) => {
    const { id } = req.params
    Event
        .findById(id)
        .then(editEvent => {
            res.render('./poke-events/edit-event', editEvent)
        })
        .catch(err => err)
});

router.post("/events/:id/edit", (req, res, next) => {
    const { id } = req.params
    const { name, details, location, date } = req.body
    Event
        .findByIdAndUpdate(id, { name, details, location, date })
        .then(lastEvent => {
            res.redirect('/events')
        })
        .catch(err => err)
});

/////////////////////////////DELETE EVENTS
router.post("/events/:id/delete", (req, res, next) => {
    const { id } = req.params
    Event
        .findByIdAndDelete(id)
        .then(lastEvent => {
            res.redirect('/events')
        })
        .catch(err => console.log(`dando error${err}`))
});

module.exports = router;

