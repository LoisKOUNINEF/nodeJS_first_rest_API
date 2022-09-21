const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null) {
          const message = `Pokemon with id ${req.params.id} doesn't exist. Please try again with another id.`
          return res.status(404).json({ message })
        }
        const message = `Pokemon with id ${req.params.id} was found.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `Pokemon with id ${req.params.id} couldn't be found. Please try again in a moment.`
        res.status(500).json({ message, data: error })
      })
  })
}
