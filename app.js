const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// initialize routing
app.use(require('./routes/index.routes'))

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

module.exports = app
