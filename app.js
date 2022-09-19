const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello, world !'));

app.get('/api/pokemons/:id', (req, res) => {
  const id = req.params.id
  res.send(`Here comes Pokemon number ${id}`)
})

app.listen(port, () => console.log(`Our NodeJS API is running on http://localhost:${port}`));
