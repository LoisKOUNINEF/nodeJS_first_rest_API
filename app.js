const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require ('./src/db/sequelize');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(favicon(`${__dirname}/favicon.ico`))
  .use(bodyParser.json())

sequelize.initDb()

// Read routes
require('./src/routes/pokemons/findAllPokemons')(app)
require('./src/routes/pokemons/findPokemonByPk')(app)

// CUD routes
require('./src/routes/pokemons/createPokemon')(app)
require('./src/routes/pokemons/updatePokemon')(app)
require('./src/routes/pokemons/deletePokemon')(app)

// User auth routes
require('./src/routes/users/login')(app)

// Errors catching
app.use(({res}) => {
  const message = 'Cannot find ressource requested. Perhaps you should try with a different URL.'
  res.status(404).json({message})
})

app.listen(port, () => console.log(`Our NodeJS API is running on http://localhost:${port}`));
