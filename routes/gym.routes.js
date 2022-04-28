const router = require("express").Router();
const fileUploader = require('./../config/cloudinary.config')

const Gym = require('./../models/Gym.model')
const User = require('./../models/User.model')

router.get('/create-gym', (req, res, next) => {
    User
        .find({ role: 'LEADER' })
        .then(leaderUsers => {
            res.render('gym/create-gym', { leaderUsers })
        })
        .catch(err => next(err))

})
router.post('/create-gym', fileUploader.single('imgFile'), (req, res, next) => {
    const { name, details, location, leader } = req.body
    const { path } = req.file
    Gym
        .create({ name, details, location, leader, img: path })
        .then(newGym => {
            res.redirect('/profile')
        })
        .catch(err => next(err))
})

router.get('/:id/edit-gym', (req, res, next) => {
    const { id } = req.params

    const promise = [Gym.findById(id), User.find({ role: 'LEADER' })]
    Promise
        .all(promise)
        .then(([oneGym, leaderUsers]) => {
            res.render('gym/edit-gym', { oneGym, leaderUsers })
        })
        .catch(err => next(err))
})
router.post('/:id/edit-gym', (req, res, next) => {
    const { id } = req.params
    const { name, details, location, leader } = req.body
    Gym
        .findByIdAndUpdate(id, { name, details, location, leader })
        .then(newGym => {
            res.redirect('/profile')
        })
        .catch(err => next(err))
})
router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params
    Gym
        .findByIdAndRemove(id)
        .then(newGym => {
            res.redirect('/profile')
        })
        .catch(err => next(err))
})

module.exports = router;
