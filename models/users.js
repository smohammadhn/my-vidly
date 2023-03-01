const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
  name: {
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

  isAdmin: Boolean,
})

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get('jwtSecret')
  )
}

const User = new mongoose.model('User', userSchema)

// validation
function userValidate(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
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
