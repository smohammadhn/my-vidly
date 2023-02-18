const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config')

const { customerSchema } = require(config.get('path') + '/models/customers')
const { movieSchema } = require(config.get('path') + '/models/movies')

const rentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true,
  },

  movie: {
    type: movieSchema,
    required: true,
  },

  dateOut: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  dateReturned: {
    type: Date,
  },

  rentalFee: {
    type: Number,
    min: 0,
  },
})

const Rental = mongoose.model('Rental', rentalSchema)

function rentalValidate(rental) {
  const schema = Joi.object({
    movieId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, 'object Id'),
    customerId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, 'object Id'),
  })

  const { error } = schema.validate(rental)

  return {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }
}

exports.Rental = Rental
exports.rentalSchema = rentalSchema
exports.rentalValidate = rentalValidate
