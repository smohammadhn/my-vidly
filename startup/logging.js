const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function () {
  process.on('unhandledRejection', (ex) => {
    throw ex
  })

  winston.add(
    new winston.transports.File({
      filename: 'logfile.log',
      handleExceptions: true,
      handleRejections: true,
    })
  )
  winston.add(
    new winston.transports.MongoDB({
      db: 'mongodb://localhost/vidly',
      level: 'error',
    })
  )
}
