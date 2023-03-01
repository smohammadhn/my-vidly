const Joi = require('joi')

module.exports = {
  // prevent running the application without setting environment variables being set
  checkEnvironmentVariables() {
    const requiredEnvVars = ['PORT', 'JWT_SECRET']

    requiredEnvVars.forEach((envKey) => {
      if (!process.env[envKey])
        throw new Error(
          `${envKey} environment varialble not found, Have you forgotten to set your environment variables?`
        )
    })
  },

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
