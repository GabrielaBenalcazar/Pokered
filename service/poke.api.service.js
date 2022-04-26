const axios = require('axios')

class ApiService {
    constructor() {
        this.axiosApp = axios.create({ baseURL: 'https://pokeapi.co/api/v2' })
    }

























































    










    getAllPokemon(id) {
        this.axiosApp.get(`/pokemon/${id}`)
            .then(({ data }) => {
                return data
                // console.log("DATRAASDFEF:....:", data)
            })
    }


























    getOnePokemon(id) {
        return this.axiosApp.get(`/pokemon/${id}`)
    }

}

module.exports = ApiService