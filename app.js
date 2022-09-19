const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { success, getUniqueId } = require('./helper');
let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

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

app.listen(port, () => console.log(`Our NodeJS API is running on http://localhost:${port}`));
