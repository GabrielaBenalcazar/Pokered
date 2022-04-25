const router = require('express').Router()

const ApiService = require('../../service/poke.api.service')

const Service = new ApiService



router.get('/pokemons', (req, res, next) => {
    let arr = []

    for (let i = 1; i <= 150; i++) {
        arr.push(i)
    }
    arr.map(eachPokemon => {
        console.log(Service.getAOnePokemon(eachPokemon).then(data => console.log(data)))
    })

    // Service
    //     .getAllPokemons(arr)
    //     .then((data) => {
    //         console.log(data)
    //         //res.render('pokemon-views/pokemon-list', { pokemons })
    //     })
    //     .catch(err => res.send('estoy dando error', err))

})


router.get('/pokemons/:id', (req, res, next) => {
    const { id } = req.params
    Service
        .getAOnePokemon(id)
        .then(({ data }) => {
            res.render('pokemon-views/pokemon-details', data)

        })
        .catch(err => err)
})






module.exports = router