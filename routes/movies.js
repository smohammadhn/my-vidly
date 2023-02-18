// imports
const express = require('express')
const router = express.Router()
const config = require('config')

const { Movie, movieValidate } = require(config.get('path') + '/models/movies')
const { Genre } = require('../models/genres')

// get methods
router.get('/', async (req, res) => {
  const allMovies = await Movie.find().sort('title').select('-__v')
  res.send(allMovies)
})

router.get('/:id', async (req, res) => {
  await Movie.findById(req.params.id)
    .then((foundMovie) => {
      if (!foundMovie)
        res.status(404).send('Movie with the given id not found!')
      else res.send(foundMovie)
    })
    .catch((err) => res.status(500).send(err.message))
})

// post method
router.post('/', async (req, res) => {
  const { valid, message } = movieValidate(req.body)
  if (!valid) return res.status(400).send(message)

  // check if genre sent by user actually exists
  const genre = await Genre.findById(req.body.genreId).catch((err) =>
    res.status(500).send(err.message)
  )
  if (!genre) return res.status(400).send('Invalid Genre.')

  await Movie.create({
    title: req.body.title,
    genre: genre.name,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  })
    .then((createdMovie) => res.send(createdMovie))
    .catch((err) => res.status(500).send(err.message))
})

// put method
router.put('/:id', async (req, res) => {
  const { valid, message } = movieValidate(req.body)
  if (!valid) return res.status(400).send(message)

  // check if genre sent by user actually exists
  const genre = await Genre.findById(req.body.genreId).catch((err) =>
    res.status(500).send(err.message)
  )
  if (!genre) return res.status(400).send('Invalid Genre.')

  await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  })
    .then((updatedMovie) => {
      if (!updatedMovie)
        res.status(404).send('Movie with the given id not found!')
      else res.send(updatedMovie)
    })
    .catch((err) => res.status(500).send(err.message))
})

// delete method
router.delete('/:id', async (req, res) => {
  await Movie.findByIdAndRemove(req.params.id)
    .then((deletedMovie) => {
      if (!deletedMovie)
        res.status(404).send('Movie with the given id not found!')
      else res.send(deletedMovie)
    })
    .catch((err) => res.status(500).send(err.message))
})

module.exports = router
