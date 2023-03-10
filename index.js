// -------------------------------- START: imports --------------------------------

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

// initialize mongoose
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.set('returnOriginal', false)
mongoose
  .connect('mongodb://localhost/vidly')
  .then(() => console.log('Success: connected to vidly database'))
  .catch(() =>
    console.log(
      'Failed: connection to vidly database. Did you forget to run mongod command?'
    )
  )

// other useful middlewares:
// EXPRESS ASYNC ERRORS: monkey patches all route handlers inside a function with a try catch block
require('express-async-errors')

// WINSTON: error logger
const winston = require('winston')
require('winston-mongodb')
winston.add(new winston.transports.File({ filename: 'logfile.log' }))
winston.add(
  new winston.transports.MongoDB({
    db: 'mongodb://localhost/vidly',
    level: 'error',
  })
)

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

// other misc imports
require(config.get('path') + '/startup/routes')(app)
const { checkEnvironmentVariables } = require(config.get('path') +
  '/helpers/validators')

// -------------------------------- END: imports --------------------------------

// -------------------------------- START: application main program --------------------------------

checkEnvironmentVariables()

const port = config.get('port')
app.listen(port, () => console.log(`Listening on port ${port} ...`))

// -------------------------------- END: application main program --------------------------------
