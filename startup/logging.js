const { createLogger, format, transports } = require('winston')
require('winston-mongodb')
require('express-async-errors')

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    format.align(),
    format.json()
  ),

  transports: [
    new transports.File({
      handleExceptions: true,
      handleRejections: true,
      filename: 'logfile.log',
    }),
    new transports.MongoDB({
      db: 'mongodb://localhost/vidly',
    }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      handleExceptions: true,
      handleRejections: true,
      format: format.combine(format.colorize(), format.simple()),
    })
  )
}

module.exports = logger
