const router = require('express').Router();
const pokemon = require('../controllers/PokeController');
const verifyJWT = require('../config/verifyJWT');

router.route('/pokemon')
    .get(pokemon.FindPokemonView)
    .post(pokemon.FindPokemonByIdOrName);

router.route('/wild')
    .get(verifyJWT, pokemon.FindRandomPokemon);

router.route('/catch/:id')
    .get(verifyJWT, pokemon.CatchPokemon)
    .post(verifyJWT, pokemon.CatchPokemon);

module.exports = function (app) {
    app.use('/', router);
}