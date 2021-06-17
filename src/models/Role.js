const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')

const Role = sequelize.define('Role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

module.exports = Role
