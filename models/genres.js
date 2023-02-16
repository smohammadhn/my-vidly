import mongoose from 'mongoose'
import Joi from 'joi'

const Genre = mongoose.model(
  'Genres',
  new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'mongoose :>> genre name required'],
      minLength: 3,
      maxLength: 30,
    },
  })
)

// validation
function checkGenreSchema(genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(30),
  })

  const { error } = schema.validate(genre)

  return {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }
}

exports.Genre = Genre
exports.validate = checkGenreSchema
