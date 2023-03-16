const mongoose = require('mongoose')
const config = require('config')
const logger = require(config.get('path') + '/startup/logging')

module.exports = function () {
  mongoose.set('strictQuery', false)
  mongoose.set('returnOriginal', false)

  mongoose
    .connect(config.get('db'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      logger.info(`Success: connected to ${config.get('db')} database`)
    )
}
