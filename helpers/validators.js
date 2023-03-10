const Joi = require('joi')

module.exports = {
  validateLogin(userPayload) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
    })

    const { error } = schema.validate(userPayload)

    return {
      valid: error == null,
      message: error ? error.details[0].message : null,
    }
  },
}
