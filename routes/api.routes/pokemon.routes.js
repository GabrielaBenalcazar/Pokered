const router = require("express").Router();

const ApiService = require("../../service/poke.api.service");

const Service = new ApiService();

router.get("/pokemons", (req, res, next) => {
    Service.getAllPokemons()
        .then((pokemons) => {
            let arr = [];

            pokemons.forEach((pokemon) => {
                const { name } = pokemon;

                arr.push(Service.getPokemonByName(name));
            });

            Promise.all(arr).then((detailedPokemonlist) => {
                res.render("pokemon/list", { pokemons: detailedPokemonlist });
            });
        })

        .catch((error) => next(error));
});

router.get("/pokemons/:name", (req, res, next) => {
    const { name } = req.params;

    Service.getPokemonByName(name)
        .then((pokemon) => {
            res.render("pokemon/details", pokemon);
        })
        .catch((error) => next(error));
});








module.exports = router;
