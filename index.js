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

// other useful packages:
// HELMET: adds additional headers to api headers (best-practice)
const helmet = require('helmet')
app.use(helmet())

// MORGAN: logging api requests
const morgan = require('morgan')
app.use(morgan('tiny'))

// other misc imports
const { checkGenreSchema, checkEnvironmentVariables } = require(__dirname +
  '/helpers/validators')
const genres = require(__dirname + '/testData/genres')

// -------------------------------- END: imports --------------------------------

// -------------------------------- START: api endpoints --------------------------------

// get methods
app.get('/', (req, res) => {
  res.send('Welcome to my version of Vidly')
})

app.get('/api/genres', (req, res) => {
  res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
  const id = req.params.id

  let targetGenre = genres.find((e) => e.id.toString() === id.toString())
  if (!targetGenre)
    return res.status(404).send('Genre with the given id does not exist.')

  res.send(targetGenre)
})

// post methods
app.post('/api/genres', (req, res) => {
  const { valid, message } = checkGenreSchema(req.body)

  console.log({ valid, message })

  if (!valid) return res.status(400).send(message)

  const newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  }

  genres.push(newGenre)
  res.send(newGenre)
})

// put methods
app.put('/api/genres/:id', (req, res) => {
  const id = req.params.id

  let targetGenre = genres.find((e) => e.id.toString() === id.toString())
  if (!targetGenre)
    return res.status(404).send('Genre with the given id does not exist.')

  const { valid, message } = checkGenreSchema(req.body)
  if (!valid) return res.status(400).send(message)

  targetGenre = Object.assign(targetGenre, req.body)
  res.send(targetGenre)
})

// delete methods
app.delete('/api/genres/:id', (req, res) => {
  const id = req.params.id

  let targetGenre = genres.find((e) => e.id.toString() === id.toString())
  if (!targetGenre)
    return res.status(404).send('Genre with the given id does not exist.')

  const index = genres.indexOf(targetGenre)
  genres.splice(index, 1)

  res.send(targetGenre)
})

// -------------------------------- END: api endpoints --------------------------------

// -------------------------------- START: application main program --------------------------------

checkEnvironmentVariables()

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port} ...`))

// -------------------------------- END: application main program --------------------------------

console.log(process.env.NODE_ENV)
