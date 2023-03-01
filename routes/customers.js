// imports
const express = require('express')
const router = express.Router()
const config = require('config')
const auth = require(config.get('path') + '/middlewares/auth')
const { Customer, customerValidate } = require(config.get('path') +
  '/models/customers')

// get methods
router.get('/', async (req, res) => {
  const allCustomers = await Customer.find().sort('name')
  res.send(allCustomers)
})

router.get('/:id', async (req, res) => {
  await Customer.findById(req.params.id).then((customer) => {
    if (!customer) res.status(404).send('customer with the given id not found!')
    else res.send(customer)
  })
})

// post method
router.post('/', auth, async (req, res) => {
  const { valid, message } = customerValidate(req.body)
  if (!valid) return res.status(400).send(message)

  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  })

  await customer.save().then((newCustomer) => res.send(newCustomer))
})

// put method
router.put('/:id', auth, async (req, res) => {
  const { valid, message } = customerValidate(req.body)
  if (!valid) return res.status(400).send(message)

  await Customer.findByIdAndUpdate(req.params.id, req.body).then((customer) => {
    if (!customer) res.status(404).send('customer with the given id not found!')
    else res.send(customer)
  })
})

// delete method
router.delete('/:id', auth, async (req, res) => {
  await Customer.findByIdAndRemove(req.params.id).then((customer) => {
    if (!customer) res.status(404).send('customer with the given id not found!')
    else res.send(customer)
  })
})

module.exports = router
