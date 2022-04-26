const router = require("express").Router();

const bcrypt = require("bcryptjs/dist/bcrypt");
const bcryptjs = require("bcryptjs");
const saltRounds = 10;

const { isLoggedOut, isLoggedIn } = require("./../middleware/route-guard");

const User = require("../models/User.model");

router.get("/register", isLoggedOut, (req, res, next) => {
    res.render("auth/register");
});

router.post("/register", isLoggedOut, (req, res, next) => {
    const { username, email, plainPassword, img } = req.body;
    bcryptjs
        .genSalt(saltRounds)
        .then((salt) => bcryptjs.hash(plainPassword, salt))
        .then((hashedPassword) =>
            User.create({ username, email, password: hashedPassword, img })
        )
        .then(() => res.redirect("/login"))
        .catch((error) => next(error));
});

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
                res.render("auth.login", {
                    errorMessage: "Usuario no reconocido",
                });
                return;
            }

            if (!bcryptjs.compareSync(plainPassword, user.password)) {
                res.render("auth/login", {
                    errorMessage: "Contraseña no válida",
                });
                return;
            }

            req.session.currentUser = user;
            res.redirect("/profile");
        })
        .catch((error) => next(error));
});

router.post("/logout", (req, res, next) => {
    req.session.destroy(() => res.redirect("/"));
});

module.exports = router;
