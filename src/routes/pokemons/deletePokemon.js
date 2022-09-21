const { Pokemon } = require('../../db/sequelize')

module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon === null) {
          const message = `Pokemon with id ${req.params.id} doesn't exist. Please try with a valid id.`
          return res.status(404).json({ message })
        }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Pokemon with id ${pokemonDeleted.id} successfully deleted.`
        res.json({message, data: pokemonDeleted })
      })
    })
    .catch(error => {
      const message = `Pokemon couldn't be deleted. Please try again in a moment.`
      res.status(500).json({ message, data: error})
    })
  })
}
