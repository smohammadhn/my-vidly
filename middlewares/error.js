// This middleware is registered after all of other route middlewares so
// it will automatically trigger if any kind of error happens inside route handlers
// (as a result of 'express-async-errors' package)

const config = require('config')
const logger = require(config.get('path') + '/startup/logging')

module.exports = function (err, req, res, next) {
  logger.error(err.message)
  res.status(500).send('Something is wrong on the server:>> ' + err)

  // This mutherfucker took 2 hours of my life, do not delete it
  next()
}
