const config = require('config')
const error = require(config.get('path') + '/middlewares/error')

module.exports = function (app) {
  const routes = [
    'home',
    'genres',
    'customers',
    'movies',
    'rentals',
    'users',
    'login',
  ]

  routes.forEach((routeName) => {
    const routeMiddlewarePath = require(config.get('path') +
      `/routes/${routeName}.js`)

    let endPoint = `/api/${routeName}`
    if (routeName === 'home') endPoint = '/'

    app.use(endPoint, routeMiddlewarePath)
  })

  // global error handler (works in combination with express-async-errors)
  app.use(error)
}
