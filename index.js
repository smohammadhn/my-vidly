const express = require('express')
const { checkGenreSchema } = require('./validators')
const genres = require('./genres')
const app = express()

app.use(express.json())

// get methods
app.get('/', (req, res) => {
  res.send('Welcome to my version of Vidly')
})

app.get('/api/genres', (req, res) => {
  res.send(genres)
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
// delete methods

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Listening on port ${port} ...`))
