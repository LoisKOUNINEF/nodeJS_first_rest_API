module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This name is already taken.'
      },
      validate: {
        min: {
          args: [4],
          msg: 'Username has to be at least 4 characters.'
        },
        max: {
          args: [12],
          msg: 'Username cannot be longer than 12 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [6],
          msg: 'Password has to be at least 6 characters.'
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
