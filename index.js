const express = require("express")
const cors = require('cors')
const { addProfile, getProfiles } = require("./controllers/profiles")
const myLogger = require('./middlewares/logger')
const { getUsers, addUser, getUser, modifyUser, deleteUser } = require("./controllers/users")
const login = require("./controllers/login")
const verifyToken = require("./middlewares/verifyToken")
const jwt = require('jsonwebtoken');

// Init the app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(myLogger)

const secretKey = 'youCantCatchme098765%^&*##@'

// File serving
app.use('/static', express.static('public'))
app.use('/private', verifyToken, (req, res, next) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            next()
        }
    })
}, express.static('private'))

// Create Route handlers

// Profiles
app.post('/profile', addProfile)
app.get('/profiles', verifyToken, getProfiles)

// Users
app.get('/users', getUsers)
app.post('/user', addUser)
app.get('/user/:id', getUser)
app.put('/user/:id', modifyUser)
app.delete('/user/:id', deleteUser)

// Login
app.post('/api/login', login)


// Listen on a port

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server Started on port ${PORT}...`))