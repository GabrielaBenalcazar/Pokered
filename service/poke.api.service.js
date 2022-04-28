const axios = require("axios");

class ApiService {
    constructor() {
        this.axiosApp = axios.create({ baseURL: "https://pokeapi.co/api/v2" });
    }

    getAllPokemons(limit = 20) {
        return this.axiosApp
            .get(`/pokemon?limit=${limit}&offset=0`)
            .then(({ data }) => {
                const pokemons = data.results;
                return pokemons;
            })
            .catch((err) => console.log(err));
    }

    getPokemonByName(name) {
        return this.axiosApp
            .get(`/pokemon/${name}`)
            .then(({ data }) => {
                const pokemon = data;
                return pokemon;
            })
            .catch((err) => console.log(err));
    }
}

module.exports = ApiService;
