const express = require('express')
const router = express.Router()
const config = require('config')
const bcrypt = require('bcrypt')
const { User } = require(config.get('path') + '/models/users')
const { validateLogin } = require(config.get('path') + '/helpers/validators')

// post methods
router.post('/', async (req, res) => {
  // body is mis-formatted
  const { valid, message } = validateLogin(req.body)
  if (!valid) return res.status(400).send(message)

  // such user does not exist
  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid email or password. ')

  // password is incorrect
  const isValidPassword = await bcrypt.compare(req.body.password, user.password)
  if (!isValidPassword)
    return res.status(400).send('Invalid email or password.')

  // now we're good!
  res.send({ token: user.generateAuthToken() })
})

module.exports = router
