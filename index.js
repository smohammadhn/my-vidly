const helmet = require('helmet')
const morgan = require('morgan')
const express = require('express')
const { checkGenreSchema } = require('./validators')
const genres = require('./genres')
const logger = require('./middlewares/logger')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('tiny'))
app.use(logger)

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

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Listening on port ${port} ...`))
