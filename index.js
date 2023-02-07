const express = require('express')
const genres = require('./genres')
const app = express()

app.use(express.json())

// get methods
app.get('/', (req, res) => {
  res.send('Welcome to my version of Vidly')
})

app.get('/api/genres', (req, res) => {
  res.send(genres)
})

// post methods
// put methods
// delete methods

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Listening on port ${port} ...`))
