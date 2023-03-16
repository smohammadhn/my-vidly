// enable usage of .env file for environment variables
require('dotenv').config({ path: __dirname + '/.env' })

// initialize express module
const express = require('express')
const app = express()

// express built-in middlewares
// STATIC: enable /static folder to be shown at domain:port/somethingInsideStaticFolder
app.use(express.static('public'))

// JSON: if the body of the incoming request contains a JSON object, it populates req.body
app.use(express.json())

// URLENCODED: parses incoming requests with urlencoded payloads and is based on body-parser (eg. requests using html forms)
app.use(express.urlencoded({ extended: true }))

// HELMET: adds additional headers to api headers (best-practice)
const helmet = require('helmet')
app.use(helmet())

// MORGAN: logging api requests
const morgan = require('morgan')
app.use(morgan('tiny'))

// CONFIG: getting and setting global configuration for the project
const config = require('config')
const { resolve } = require('path')
config.path = resolve()

// startup files imports
const logger = require(config.get('path') + '/startup/logging')
require(config.get('path') + '/startup/config')()
require(config.get('path') + '/startup/routes')(app)
require(config.get('path') + '/startup/db')()

const port = config.get('port')
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port} ...`)
)

module.exports = server
