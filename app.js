const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require ('sequelize');
const { success, getUniqueId } = require('./helper');
let pokemons = require('./mock-pokemon');
const PokemonModel = require ('./src/models/pokemon');

const app = express();
const port = 3000;

const sequelize = new Sequelize (
  'pokedex',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2'
    },
    logging: false
  }
)

sequelize.authenticate()
  .then(_ => console.log('DataBase connection established.'))
  .catch(error => console.error(`Cannot connect to DataBase ${error}`))

const Pokemon = PokemonModel(sequelize, DataTypes)

sequelize.sync({force: true})
  .then(_ => {
    console.log('DataBase "Pokedex" successfully synced.')

    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join()
      }).then(pokemon => console.log(pokemon.toJSON()))
    })
  })

app
  .use(favicon(`${__dirname}/favicon.ico`))
  .use(morgan('dev'))
  .use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello, world !'));

app.get('/api/pokemons', (req, res) => {
  const message = `There are ${pokemons.length} Pokemons`
  res.json(success(message, pokemons))
})

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = `A pokemon with id ${id} was found.`
  res.json(success(message, pokemon))
})

app.post('/api/pokemons', (req, res) => {
  const id = getUniqueId(pokemons)
  const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Pokemon with id ${id} named ${pokemonCreated.name} was created.`
  res.json(success(message, pokemonCreated))
})

app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonUpdated = { ...req.body, id: id}
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon
  })
  const message = (`Pokemon ${pokemonUpdated.name} was successfully updated.`)
  res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = (`Pokemon ${pokemonDeleted.name} was successfully deleted.`)
  res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`Our NodeJS API is running on http://localhost:${port}`));
