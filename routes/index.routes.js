const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/", require("./auth.routes.js"));
router.use("/", require("./user.routes.js"));
router.use("/", require("./pokemon.routes"));
router.use("/", require("./event.routes"));


module.exports = router;
