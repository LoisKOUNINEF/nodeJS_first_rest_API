const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Pokemon ${req.body.name} successfully created.`
        res.json({ message, data: pokemon })
      })
  })
}
