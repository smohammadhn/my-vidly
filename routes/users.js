const express = require('express')
const router = express.Router()
const config = require('config')
const _ = require('lodash')

// other misc imports
const { User, userValidate } = require(config.get('path') + '/models/users')

// post methods
router.post('/', async (req, res) => {
  const { valid, message } = userValidate(req.body)
  if (!valid) return res.status(400).send(message)

  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered.')

  user = new User(_.pick(req.body, ['username', 'email', 'password']))

  await user
    .save()
    .then((genre) => res.send(genre))
    .catch((err) => res.status(500).send(err.message))
})

// delete route
router.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
    .then((foundUser) => {
      if (!foundUser)
        return res.status(404).send('User with the given id not exists')

      res.send(_.pick(foundUser, ['username', 'email', '_id']))
    })
    .catch((err) => res.status(500).send(err.message))
})

module.exports = router
