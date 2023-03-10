const config = require('config')
const logger = require(config.get('path') + '/startup/logging')

module.exports = function () {
  // check environment variables
  const requiredEnvVars = ['PORT', 'JWT_SECRET']

  requiredEnvVars.forEach((envKey) => {
    if (!process.env[envKey])
      logger.error(
        `${envKey} environment variable not found, Have you forgotten to set your environment variables?`
      )
  })
}
