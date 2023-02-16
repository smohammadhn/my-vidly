// imports
const express = require('express')
const router = express.Router()
const config = require('config')

const { Customer, validate } = require(config.get('path') + '/models/customers')

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
  const { valid, message } = validate(req.body)
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
  const { valid, message } = validate(req.body)
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
