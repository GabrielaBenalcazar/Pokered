const axios = require('axios')

class ApiService {
    constructor() {
        this.axiosApp = axios.create({ baseURL: 'https://pokeapi.co/api/v2' })
    }


    getAllPokemons() {
        let apiPokem = []
        for (let i = 1; i < 150; ++i) {
            apiPokem.push(i)
        }
        return apiPokem
        //this.getAOnePokemon(apiPokem)

    }


    getAOnePokemon(id) {
        return this.axiosApp.get(`/pokemon/${id}`)
    }

}

module.exports = ApiService