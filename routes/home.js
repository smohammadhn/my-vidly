const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to my version of Vidly')
})

module.exports = router
