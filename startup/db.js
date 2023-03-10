const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function () {
  mongoose.set('strictQuery', false)
  mongoose.set('returnOriginal', false)

  mongoose
    .connect('mongodb://localhost/vidly')
    .then(() => winston.info('Success: connected to vidly database'))
}
