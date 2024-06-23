const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3001
app.use(
  cors({
    allow: '*',
  })
)

app.use('/test-images', express.static('test-images'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/session', require('./routes/session'))

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`)
})
