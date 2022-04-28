const req = require("express/lib/request");
const { redirect } = require("express/lib/response");

const router = require("express").Router();

router.use("/", require("./idx.routes.js"));
router.use("/", require("./auth.routes.js"));
router.use("/profile", require("./user.routes.js"));
router.use("/pokemons", require("./pokemon.routes"));
router.use("/events", require("./event.routes"));
router.use("/profile", require("./gym.routes"));

module.exports = router;
