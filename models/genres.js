const mongoose = require('mongoose')
const Joi = require('joi')

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'mongoose :>> genre name required'],
    minLength: 5,
    maxLength: 30,
  },
})

const Genre = mongoose.model('Genres', genreSchema)

// validation
function genreValidate(genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(30),
  })

  const { error } = schema.validate(genre)

  return {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }
}

exports.Genre = Genre
exports.genreSchema = genreSchema
exports.genreValidate = genreValidate
