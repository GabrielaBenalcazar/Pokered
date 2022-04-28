const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

router.use("/", require("./auth.routes.js"));
router.use("/profile", require("./user.routes.js"));
router.use("/pokemons", require("./pokemon.routes"));
router.use("/events", require("./event.routes"));
router.use("/profile", require("./gym.routes"));

module.exports = router;
