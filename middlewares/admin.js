// this middleware must be used after using 'auth' middleware so that we have access to req.user
module.exports = function (req, res, next) {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .send('You do not have permission to perform this action.')
  next()
}
