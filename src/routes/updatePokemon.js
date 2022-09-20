const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon === null) {
          const message = `Pokemon with id ${id} doesn't exist. Please try with a valid id.`
          return res.status(404).json({ message })
        }
        const message = `Pokemon ${pokemon.name} successfully updated.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
        const message= `Pokemon couldn't be updated. Please try again in a moment.`
        res.status(500).json({ message, data: error })
    })
  })
}
