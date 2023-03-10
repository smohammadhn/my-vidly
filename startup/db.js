const mongoose = require('mongoose')
const config = require('config')
const logger = require(config.get('path') + '/startup/logging')

module.exports = function () {
  mongoose.set('strictQuery', false)
  mongoose.set('returnOriginal', false)

  mongoose
    .connect('mongodb://localhost/vidly')
    .then(() => logger.info('Success: connected to vidly database'))
}
