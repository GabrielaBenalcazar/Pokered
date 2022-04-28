const router = require("express").Router();
const fileUploader = require("./../config/cloudinary.config")

const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const { isLoggedOut, isLoggedIn } = require("./../middleware/route-guard");

const User = require("../models/User.model");

const { formatError } = require("../utils/err");

//REGISTER

router.get("/register", isLoggedOut, (req, res, next) => {
    res.render("auth/register");
});

router.post("/register", fileUploader.single('imgFile'), isLoggedOut, (req, res, next) => {
    const { username, email, plainPassword, img } = req.body;
    const { path } = req.file
  
    if (plainPassword.length === 0) {
        res.render("auth/register", { errorPassword: "La contraseña es obligatoria" });
        return;
    }

    bcryptjs
        .genSalt(saltRounds)
        .then((salt) => bcryptjs.hash(plainPassword, salt))
        .then((hashedPassword) => User.create({ username, email, password: hashedPassword, img: path }))
        .then(() => res.redirect("/login"))
        .catch((err) => {
            err instanceof mongoose.Error.ValidationError
                ? res.render("auth/register", { errorMessage: formatError(err) })
                : next(err);
        });
});

//login

router.get("/login", isLoggedOut, (req, res, next) => {
    res.render("auth/login");
});

router.post("/login", (req, res, next) => {
    const { email, plainPassword } = req.body;

    if (email.length === 0 || plainPassword.length === 0) {
        res.render("auth/login", { errorMessage: "Rellena todos los campos" });
        return;
    }

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.render("auth/login", { errorMessage: "Usuario no reconocido" });
                return;
            }
            if (!bcryptjs.compareSync(plainPassword, user.password)) {
                res.render("auth/login", { errorMessage: "Contraseña no válida" });
                return;
            }
            req.session.currentUser = user;
            res.redirect("/profile");
        })
        .catch((err) => next(err));
});

router.post("/logout", isLoggedIn, (req, res, next) => {
    req.session.destroy(() => res.redirect("/"));
});

module.exports = router;