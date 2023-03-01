// imports
const express = require('express')
const router = express.Router()
const config = require('config')
const auth = require(config.get('path') + '/middlewares/auth')
const { Rental, rentalValidate } = require(config.get('path') +
  '/models/rentals')
const { Customer } = require(config.get('path') + '/models/customers')
const { Movie } = require(config.get('path') + '/models/movies')

// get methods
router.get('/', async (req, res) => {
  const allRentals = await Rental.find().select('-__v')
  res.send(allRentals)
})

router.get('/:id', async (req, res) => {
  await Rental.findById(req.params.id)
    .then((foundRental) => {
      if (!foundRental)
        return res.status(404).send('Rental item with the given id not found')

      res.send(foundRental)
    })
    .catch((err) => res.status(500).send(err))
})

// post method
router.post('/', auth, async (req, res) => {
  const { valid, message } = rentalValidate(req.body)
  if (!valid) return res.status(400).send(message)

  const foundCustomer = await Customer.findById(req.body.customerId)
  if (!foundCustomer)
    return res.status(404).send('Customer with the given id not found')

  const foundMovie = await Movie.findById(req.body.movieId)
  if (!foundMovie)
    return res.status(404).send('Movie with the given id not found')

  if (foundMovie.numberInStock === 0)
    return res.status(400).send('Movie not in stock.')

  await Rental.create({
    customer: foundCustomer,
    movie: foundMovie,
  })
    .then(async (createdRental) => {
      foundMovie.numberInStock--
      await foundMovie.save()

      res.send(createdRental)
    })
    .catch((err) => res.status(500).send(err))
})

module.exports = router
