const express = require('express')
const router = express.Router()
const config = require('config')
const auth = require(config.get('path') + '/middlewares/auth')
const admin = require(config.get('path') + '/middlewares/admin')
const { Genre, genreValidate } = require(config.get('path') + '/models/genres')
const validateObjectId = require(config.get('path') +
  '/middlewares/validateObjectId')

// get methods
router.get('/', async (req, res) => {
  await Genre.find()
    .sort('name')
    .then((genre) => {
      res.send(genre)
    })
})

router.get('/:id', validateObjectId, async (req, res) => {
  await Genre.findById(req.params.id).then((genre) => {
    if (!genre) res.status(404).send('Genre with the given id does not exist.')
    else res.send(genre)
  })
})

// post methods
router.post('/', auth, async (req, res) => {
  const { valid, message } = genreValidate(req.body)
  if (!valid) return res.status(400).send(message)

  const genre = new Genre({
    name: req.body.name,
  })

  await genre.save().then((genre) => res.send(genre))
})

// put methods
router.put('/:id', auth, async (req, res) => {
  const { valid, message } = genreValidate(req.body)
  if (!valid) return res.status(400).send(message)

  await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }).then(
    (genre) => {
      if (!genre)
        res.status(404).send('Genre with the given id does not exist.')
      else res.send(genre)
    }
  )
})

// delete methods
router.delete('/:id', [auth, admin], async (req, res) => {
  await Genre.findByIdAndRemove(req.params.id).then((genre) => {
    if (!genre) res.status(404).send('Genre with the given id does not exist.')
    else res.send(genre)
  })
})

module.exports = router
