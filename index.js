const express = require("express")
const cors = require('cors')
const { addProfile, getProfiles } = require("./controllers/profiles")
const myLogger = require('./middlewares/logger')
const { getUsers, addUser, getUser, modifyUser, deleteUser } = require("./controllers/users")

// Init the app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(myLogger)


// File serving
app.use('/static', express.static('public'))

// Create Route handlers

// Profiles
app.post('/profile', addProfile)
app.get('/profiles', getProfiles)

// Users
app.get('/users', getUsers)
app.post('/user', addUser)
app.get('/user/:id', getUser)
app.put('/user/:id', modifyUser)
app.delete('/user/:id', deleteUser)


// Listen on a port

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))