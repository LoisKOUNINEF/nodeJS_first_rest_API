const { Pokemon } = require('../../db/sequelize');
const { ValidationError, UniqueConstraintError } = require ('sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Pokemon ${req.body.name} successfully created.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `Pokemon couldn't be created due to server error. Try again later.`
        res.status(500).json({ message, data: error })
      })
  })
}
