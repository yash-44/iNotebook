const connectToMongo = require('./db.js')
const express = require('express')
const cors = require('cors')

connectToMongo()
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors())
 
// middle man
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})