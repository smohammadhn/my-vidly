const express = require('express')
const router = express.Router()
const config = require('config')
const _ = require('lodash')
const bcrypt = require('bcrypt')

// other misc imports
const { User, userValidate } = require(config.get('path') + '/models/users')

// post methods
router.post('/', async (req, res) => {
  const { valid, message } = userValidate(req.body)
  if (!valid) return res.status(400).send(message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered.')

  user = new User(_.pick(req.body, ['name', 'email', 'password']))

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  await user
    .save()
    .then((createdUser) =>
      res.send(_.pick(createdUser, ['name', 'email', '_id']))
    )
    .catch((err) => res.status(500).send(err.message))
})

// delete route
router.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
    .then((foundUser) => {
      if (!foundUser)
        return res.status(404).send('User with the given id not exists')

      res.send(_.pick(foundUser, ['name', 'email', '_id']))
    })
    .catch((err) => res.status(500).send(err.message))
})

module.exports = router
