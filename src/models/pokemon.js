const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrique', 'Fée']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This name is already taken.'
      },
      validate: {
        notEmpty: { msg: 'Give your Pokemon a name.'},
        notNull: { msg: 'Pokemon has to have a name.'}
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Use only whole numbers for hp.'},
        notNull: { msg: 'Pokemon has to have hp.'},
        min: {
          args: [1],
          msg: 'Pokemon\'s hp has to be greater than 0.'
        },
        max: {
          args: [999],
          msg: 'Pokemon\'s hp cannot be greater than 999.'
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Use only whole numbers for cp.'},
        notNull: { msg: 'Pokemon has to have cp.'},
        min: {
          args: [1],
          msg: 'Pokemon\'s cp has to be greater than 0.'
        },
        max: {
          args: [99],
          msg: 'Pokemon\'s cp cannot be greater than 99.'
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Picture path has to be a valid URL.'},
        notNull: { msg: `Pokemon's picture is required.`}
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if(!value) {
            throw new Error('Pokemon has to have at least one type.')
          }
          if(value.split(',').length > 3) {
            throw new Error('Pokemon cannot have more than 3 types.')
          }
          value.split(',').forEach(type => {
            if(!validTypes.includes(type)) {
              throw new Error(`Pokemon\'s type has to be one of the following: ${validTypes}`)
            }
          })
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
