const { User } = require('../../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
  app.post('/api/login', (req, res) => {

    User.findOne({ where: { username: req.body.username } }).then(user => {

      if(!user) {
        const message = 'Username doesn\'t exist'
        return res.status(404).json({ message })
      }

      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {

        if(!isPasswordValid) {
          const message = 'Invalid password.'
          return res.status(401).json({ message })
        }

        const message = `User ${req.body.username} successfully logged in.`;
        return res.json({ message, data: user })
      })
    })
    .catch(error => {
      const message = 'User couldn\'t be logged in. Please try again later.'
      return res.json({ message, data: error })
    })
  })
}
