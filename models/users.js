const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },

  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
    unique: true,
  },
})

const User = new mongoose.model('User', userSchema)

// validation
function userValidate(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  })

  const { error } = schema.validate(user)

  return {
    valid: error == null,
    message: error ? error.details[0].message : null,
  }
}

exports.User = User
exports.userSchema = userSchema
exports.userValidate = userValidate
