const winston = require('winston')

module.exports = function () {
  // check environment variables
  const requiredEnvVars = ['PORT', 'JWT_SECRET']

  requiredEnvVars.forEach((envKey) => {
    if (!process.env[envKey])
      winston.error(
        `${envKey} environment variable not found, Have you forgotten to set your environment variables?`
      )
  })
}
