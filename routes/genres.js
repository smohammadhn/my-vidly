const express = require('express')
const router = express.Router()
const config = require('config')
const mongoose = require('mongoose')

// other misc imports
const { checkGenreSchema } = require(config.get('path') + '/helpers/validators')

const Genre = mongoose.model(
  'Genres',
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'mongoose :>> genre name required'],
      minLength: 3,
      maxLength: 30,
    },
  })
)

// get methods
router.get('/', async (req, res) => {
  await Genre.find()
    .sort('name')
    .then((genre) => {
      res.send(genre)
    })
    .catch((err) => res.status(500).send(err.message))
})

router.get('/:id', async (req, res) => {
  await Genre.findById(req.params.id)
    .then((genre) => {
      if (!genre)
        res.status(404).send('Genre with the given id does not exist.')
      else res.send(genre)
    })
    .catch((err) => res.status(500).send(err.message))
})

// post methods
router.post('/', async (req, res) => {
  const { valid, message } = checkGenreSchema(req.body)
  if (!valid) return res.status(400).send(message)

  const genre = new Genre({
    name: req.body.name,
  })

  await genre
    .save()
    .then((genre) => {
      res.send(genre)
    })
    .catch((err) => res.status(500).send(err.message))
})

// put methods
router.put('/:id', async (req, res) => {
  const { valid, message } = checkGenreSchema(req.body)
  if (!valid) return res.status(400).send(message)

  await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name })
    .then((genre) => {
      if (!genre)
        res.status(404).send('Genre with the given id does not exist.')
      else res.send(genre)
    })
    .catch((err) => res.status(500).send(err.message))
})

// delete methods
router.delete('/:id', async (req, res) => {
  await Genre.findByIdAndRemove(req.params.id)
    .then((genre) => {
      if (!genre)
        res.status(404).send('Genre with the given id does not exist.')
      else res.send(genre)
    })
    .catch((err) => res.status(500).send(err.message))
})

module.exports = router
