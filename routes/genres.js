const express = require('express')
const router = express.Router()
const config = require('config')
const mongoose = require('mongoose')

// other misc imports
const { checkGenreSchema } = require(config.get('path') + '/helpers/validators')

// initialize mongoose to work with genres mongodb database
mongoose.set('strictQuery', false)
mongoose
  .connect('mongodb://localhost/genres')
  .then(() => console.log('Success: connected to genres database'))
  .catch(() => console.log('Failed: connection to genres database'))

const genreMongooseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'mongoose :>> genre name required'],

    validate: {
      validator: function (v) {
        return v && v.length > 3
      },

      message: 'mongoose :>> name must be at least 3 characters long',
    },
  },
})

const Genres = mongoose.model('Genres', genreMongooseSchema)

// get methods
router.get('/', async (req, res) => {
  const result = await Genres.find()
  res.send(result)
})

router.get('/:id', (req, res) => {
  const id = req.params.id

  let targetGenre = genres.find((e) => e.id.toString() === id.toString())
  if (!targetGenre)
    return res.status(404).send('Genre with the given id does not exist.')

  res.send(targetGenre)
})

// post methods
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id

  let targetGenre = genres.find((e) => e.id.toString() === id.toString())
  if (!targetGenre)
    return res.status(404).send('Genre with the given id does not exist.')

  const index = genres.indexOf(targetGenre)
  genres.splice(index, 1)

  res.send(targetGenre)
})

module.exports = router
