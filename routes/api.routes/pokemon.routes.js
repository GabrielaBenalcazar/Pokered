const router = require("express").Router();

const ApiService = require("../../service/poke.api.service");

const Service = new ApiService();

router.get("/pokemons", (req, res, next) => {
    Service.getAllPokemons()
        .then(({ data }) => {
            console.log(data);
            res.render("pokemon/list", data);
        })
        .catch((error) => next(error));
});

router.get("/pokemons/:name", (req, res, next) => {
    const { name } = req.params;

    Service.getPokemonByName(name)
        .then(({ data }) => {
            res.render("pokemon/details", data);
        })
        .catch((error) => next(error));
});

module.exports = router;
