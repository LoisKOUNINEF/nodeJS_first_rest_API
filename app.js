const express = require('express');
let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello, world !'));

app.get('/api/pokemons', (req, res) => {
  res.send(`There are a total of ${pokemons.length} Pokemons, for now.`)
})

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  res.send(`Here comes ${pokemon.name}`)
})

app.listen(port, () => console.log(`Our NodeJS API is running on http://localhost:${port}`));
