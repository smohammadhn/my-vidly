module.exports = {
  // prevent running the application without setting environment variables being set
  checkEnvironmentVariables() {
    if (!process.env.PORT)
      throw new Error(
        'PORT env not found, Have you forgotten to set your environment variables?'
      )
  },
}
