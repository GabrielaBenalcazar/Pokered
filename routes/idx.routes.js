const router = require("express").Router();

const ApiService = require("../service/poke.api.service");
const Service = new ApiService();

router.get("/", (req, res, next) => {
    res.render("index");
});

router.post("/", (req, res, next) => {
    const { pokemonName } = req.body;

    Service.getAllPokemons(1000)
        .then((allPokemons) => {
            const itsTrue = allPokemons.map(({ name }) => name).includes(pokemonName);

            if (itsTrue) {
                res.redirect(`/pokemons/${pokemonName}`);
            } else {
                 res.render("index", { errorMessage: "eso no es un pokemon" });
                 return;
            }
        })
        .catch((err) => next(err));
});

module.exports = router;
