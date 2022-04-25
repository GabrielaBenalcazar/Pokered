const axios = require("axios");

class ApiService {
    constructor() {
        this.axiosApp = axios.create({ baseURL: "https://pokeapi.co/api/v2" });
    }

    getAllPokemons() {
        return this.axiosApp.get("/pokemon?limit=100000&offset=0");
    }

    getPokemonByName(name) {
        return this.axiosApp.get(`/pokemon/${name}`);
    }
}

module.exports = ApiService;
