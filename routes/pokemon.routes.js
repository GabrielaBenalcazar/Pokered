const router = require("express").Router();

const ApiService = require("../service/poke.api.service");
const Service = new ApiService();

router.get("/", (req, res, next) => {
    Service.getAllPokemons(14)
        .then((pokemons) => {
            let arr = [];
            pokemons.forEach((pokemon) => {
                const { name } = pokemon;
                arr.push(Service.getPokemonByName(name));
            });
            return arr;
        })
        .then((arr) => {
            Promise.all(arr).then((detailedPokemonlist) => {
                res.render("pokemon/list", { pokemons: detailedPokemonlist });
            });
        })
        .catch((err) => next(err));
});

router.get("/:name", (req, res, next) => {
    const { name } = req.params;

    Service.getPokemonByName(name)
        .then((pokemon) => {
            res.render("pokemon/details", pokemon);
        })
        .catch((err) => next(err));
});

module.exports = router;
