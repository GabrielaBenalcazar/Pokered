const axios = require("axios");

class ApiService {
    constructor() {
        this.axiosApp = axios.create({ baseURL: "https://pokeapi.co/api/v2" });
    }

    getAllPokemons(limit) {
        return this.axiosApp
            .get(`/pokemon?limit=${limit}&offset=0`)
            .then(({ data }) => {
                const pokemons = data.results;
                return pokemons;
            });
    }

    getPokemonByName(name) {
        return this.axiosApp.get(`/pokemon/${name}`).then(({ data }) => {
            const pokemon = data;
            return pokemon;
        });
    }
}

module.exports = ApiService;
