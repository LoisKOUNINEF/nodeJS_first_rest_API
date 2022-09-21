const { Pokemon } = require('../../db/sequelize');
const { Op } = require ('sequelize');
const auth = require ('../../auth/auth');

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if(req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if(name.length <= 2) {
        const message = 'Please enter at least 3 characters in search field.'
        return res.status(400).json({ message })
      }

      return Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
        limit: limit,
        order: ['name']
        // order: [['name', 'DESC']]
      })
      .then(({count, rows}) => {
        const message = `There are ${count} that contain ${name}.`
        res.json({ message, data: rows })
      })
    } else {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'Pokemons list fetched !'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = 'Cannot fetch Pokemons list. Please try again in a moment.'
        res.status(500).json({ message, data: error })
      })
    }
  })
}
