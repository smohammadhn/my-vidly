const Joi = require('joi')

module.exports = {
  checkGenreSchema(genre) {
    const schema = Joi.object({
      name: Joi.string().required().min(3),
    })

    console.log(schema.validate(genre))
    const { error } = schema.validate(genre)

    return {
      valid: error == null,
      message: error ? error.details[0].message : null,
    }
  },
}
