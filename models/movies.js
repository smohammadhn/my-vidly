const Joi = require('joi')
const mongoose = require('mongoose')
const config = require('config')

const { genreSchema, genreValidate } = require(config.get('path') +
  '/models/genres')

const movieSchema = new mongoose.Schema({
  title: {
    type: 'String',
    minLength: 3,
    maxLength: 255,
    trim: true,
    required: true,
  },

  genre: {
    type: genreSchema,
    required: true,
  },

  numberInStock: {
    type: Number,
    default: 0,
    min: 0,
    max: 255,
  },

  dailyRentalRate: {
    type: Number,
    default: 2,
    min: 0,
    max: 255,
  },
})

const Movie = mongoose.model('Movie', movieSchema)

function movieValidate(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    numberInStock: Joi.number().default(0).min(0).max(255),
    dailyRentalRate: Joi.number().default(0).min(0).max(255),
    genreId: Joi.string().required(),
  })

  // first, validate genre before validating entire movie object
  const validateGenre = genreValidate(movie.genre)
  if (!validateGenre.valid)
    return {
      valid: validateGenre.valid,
      message: 'Genre object: ' + validateGenre.message,
    }

  // second, validate movie object
  const { error } = schema.validate(movie)
  return {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }
}

exports.Movie = Movie
exports.movieSchema = movieSchema
exports.movieValidate = movieValidate

// 63ed3912b4f82a4bf5c516a2
// 63ed395f68b9ecdde2486d61
