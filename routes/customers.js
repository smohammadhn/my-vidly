// imports
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const config = require('config')

const { checkCustomerSchema } = require(config.get('path') +
  '/helpers/validators')

// constructing customer table
const Customer = new mongoose.model(
  'Customer',
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },

    phone: {
      type: String,
      required: true,
      match: /^09.*/,
    },
  })
)

// get methods
router.get('/', async (req, res) => {
  const allCustomers = await Customer.find().sort('name')
  res.send(allCustomers)
})

router.get('/:id', async (req, res) => {
  await Customer.findById(req.params.id)
    .then((customer) => {
      if (!customer)
        res.status(404).send('customer with the given id not found!')
      else res.send(customer)
    })
    .catch((err) => res.status(500).send(err.message))
})

// post method
router.post('/', async (req, res) => {
  const { valid, message } = checkCustomerSchema(req.body)
  if (!valid) return res.status(400).send(message)

  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  })

  await customer
    .save()
    .then((newCustomer) => res.send(newCustomer))
    .catch((err) => res.status(500).send(err.message))
})

// put method
router.put('/:id', async (req, res) => {
  const { valid, message } = checkCustomerSchema(req.body)
  if (!valid) return res.status(400).send(message)

  await Customer.findByIdAndUpdate(req.params.id, req.body)
    .then((customer) => {
      if (!customer)
        res.status(404).send('customer with the given id not found!')
      else res.send(customer)
    })
    .catch((err) => res.status(500).send(err.message))
})

// delete method
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndRemove(req.params.id)
    .then((customer) => {
      if (!customer)
        res.status(404).send('customer with the given id not found!')
      else res.send(customer)
    })
    .catch((err) => res.status(500).send(err.message))
})

module.exports = router
