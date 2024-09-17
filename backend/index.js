const connectToMongo = require('./db');

const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000

app.use(cors())


connectToMongo()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Neel!')
})

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


