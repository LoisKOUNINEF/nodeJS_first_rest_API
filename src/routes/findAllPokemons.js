const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'Pokemons list fetched !'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = 'Cannot fetch Pokemons list. Please try again in a moment.'
        res.status(500).json({ message, data: error })
      })
  })
}
