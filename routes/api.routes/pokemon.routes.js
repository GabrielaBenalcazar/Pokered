const router = require('express').Router()

const ApiService = require('../../service/poke.api.service')

const Service = new ApiService



































































































































// router.get('/pokemons', (req, res, next) => {

//     Service
//         .getAllPokemons()

//         .then(({ data }) => {
//             console.log(data)
//         })

// })


router.get('/pokemons', (req, res, next) => {

    let id = []
    for (let i = 1; i <= 2; ++i) {
        id += i
    }


    Service


        .getAllPokemon(id)
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(`soy el error de pokemons ${err}`))

})







































































// router.get('/pokemons', (req, res, next) => {
//     let arr = []

//     for (let i = 1; i <= 150; i++) {
//         arr.push(i)
//     }

//     const promises = arr.map(eachPokemon => {
//         return Service.getAOnePokemon(eachPokemon)
//     })

//     Promise
//         .all(promises)
//         .then(([pok1, pok2, pok3]) => {
//             console.log(pok1)
//             //res.render('pokemon-views/pokemon-list', { pok1, pok2, pok3 })
//         })

//     // Service
//     //     .getAllPokemons(arr)
//     //     .then((data) => {
//     //         console.log(data)
//     //         //res.render('pokemon-views/pokemon-list', { pokemons })
//     //     })
//     //     .catch(err => res.send('estoy dando error', err))

// })




router.get('/pokemons/:id', (req, res, next) => {
    const { id } = req.params




    Service
        .getOnePokemon(id)
        .then(({ data }) => {
            res.render('pokemon-views/pokemon-details', data)

        })
        .catch(err => err)
})





module.exports = router;