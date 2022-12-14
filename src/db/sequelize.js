const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
const pokemons = require('./mock-pokemon');
const bcrypt = require('bcrypt');

let sequelize

if(process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('databasename', 'username', 'password', {
    host: 'host',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
} else {
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync().then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('123456', 10)
    .then(hash => {
      User.create({
        username: 'Lolo',
        password: hash
      }).then(user => console.log(user.toJSON()))
    })

    console.log('Database successfully initialized !')
  })
}

module.exports = {
  initDb, Pokemon, User
}
