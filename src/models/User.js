const { Sequelize, DataTypes } = require('sequelize')
const Role  = require('./Role')
const sequelize = require('../db')

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: `Votre email n'est pas valide`
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 18,
        msg: 'Vous devez avoir plus de 18 ans!'
      }
    }
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addr: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  presentation: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price_hour: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
})


module.exports = User
