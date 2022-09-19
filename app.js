const express = require('express');
const morgan = require('morgan');
const { success } = require('./helper');
let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

app.use(morgan('dev'))

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

app.listen(port, () => console.log(`Our NodeJS API is running on http://localhost:${port}`));
