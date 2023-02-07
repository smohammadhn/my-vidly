const express = require('express')
const app = express()

// get methods
app.get('/', (req, res) => {
  res.send('Welcome to my version of Vidly')
})

// post methods
// put methods
// delete methods

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Listening on port ${port} ...`))
