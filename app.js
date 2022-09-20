const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require ('./src/db/sequelize');

const app = express();
const port = 3000;

app
  .use(favicon(`${__dirname}/favicon.ico`))
  .use(morgan('dev'))
  .use(bodyParser.json())

sequelize.initDb()

// Read routes
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)

// CUD routes
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// Errors catching
app.use(({res}) => {
  const message = 'Cannot find ressource requested. Perhaps you should try with a different URL.'
  res.status(404).json({message})
})

app.listen(port, () => console.log(`Our NodeJS API is running on http://localhost:${port}`));
