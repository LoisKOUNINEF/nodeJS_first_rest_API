const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.post('/api/pokemons', (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Pokemon ${req.body.name} successfully created.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `Pokemon couldn't be created due to server error. Try again later.`
        res.status(500).json({ message, data: error })
      })
  })
}
