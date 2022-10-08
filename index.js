const express = require("express")
const { addProfile } = require("./controllers/profiles")
const cors = require('cors')

// Init the app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


// File serving
app.use('/static', express.static('public'))

// Create Route handlers
app.post('/profile', addProfile)

// Listen on a port

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))