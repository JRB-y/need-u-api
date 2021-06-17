const express = require('express')
const app = express()
const routes = require('./routes')
require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api', routes)

app.listen(3000, () => {
  console.log('Server is running on port 3000... ')
})
