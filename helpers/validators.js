const Joi = require('joi')

module.exports = {
  // prevent running the application without setting environment variables being set
  checkEnvironmentVariables() {
    if (!process.env.PORT)
      throw new Error(
        'PORT env not found, Have you forgotten to set your environment variables?'
      )
  },

  // genre user input validation
  checkGenreSchema(genre) {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(30),
    })

    const { error } = schema.validate(genre)

    return {
      valid: error == null,
      message: error ? error.details[0].message : null,
    }
  },

  // customer user input validation
  checkCustomerSchema(customer) {
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
  },
}
