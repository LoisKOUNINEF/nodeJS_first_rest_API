const { User } = require('../../db/sequelize');
const bcrypt = require('bcrypt');
const { ValidationError, UniqueConstraintError } = require ('sequelize');

module.exports = (app) => {
  app.post('/api/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        password: hash
      })
      user.save()
      .then(user => {
        const message = `User ${req.body.username} successfully created`
        res.json({ message, data: user})
      })
      .catch(error => {
        if(error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        if(error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error })
        }
        const message = `User couldn't be created due to server error. Try again later.`
        res.status(500).json({ message, data: error })
      })
    })
  })
}

