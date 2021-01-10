const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const personsRouter = require('./personsRouter')

const app = express()
const port = 8080 || process.env.PORT


// <img src="/images/abc.jpg" />
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use('/persons', personsRouter)
app.use(express.static(require('path').join(__dirname, 'images')));

app.listen(port, () => console.log(`Server is running on port ${port}`))
