const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('need-u', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
})

const db = async () => {
  try {
    await sequelize.authenticate()
    // await sequelize.sync({ alter: true })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

db()

module.exports = sequelize