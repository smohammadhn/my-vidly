const Joi = require('joi')

module.exports = {
  // validate user request body
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

  // prevent running the application without setting environment variables being set
  checkEnvironmentVariables() {
    if (!process.env.PORT)
      throw new Error(
        'PORT env not found, Have you forgotten to set your environment variables?'
      )
  },
}
