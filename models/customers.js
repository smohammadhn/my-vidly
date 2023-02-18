const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
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

const Customer = new mongoose.model('Customer', customerSchema)

// validation
function customerValidate(customer) {
  const schema = Joi.object({
    isGold: Joi.boolean(),
    name: Joi.string().required().min(3).max(30),
    phone: Joi.string().required().regex(/^09.*/),
  })

  const { error } = schema.validate(customer)

  return {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }
}

exports.Customer = Customer
exports.customerSchema = customerSchema
exports.customerValidate = customerValidate
