const joi = require('joi');
const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt")

const schema = joi.object({
    username: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')),
    
    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')),
})

function getUsers(req, res) {
    try {
        const users = require('../storage/users.json')

        res.send(users)
    } catch (error) {
        res.writeHead(500)
        res.end("Error While extracting users, please try again later")
    }
}

function getUser(req, res) {
    try {
        const { id } = req.params;
        
        let users = require("../storage/users.json");

        let user = users.find(user => user.id == id)

        res.send(user)
    } catch (error) {
        res.writeHead(500)
        res.end("Error While extracting the user, please try again later")
    }
}

async function addUser(req, res) {
    try {
        const { value, error } = schema.validate(req.body)
        if (error) {
            console.log("Invalid Data")
            res.writeHead(404)
            res.end()
        }
        else {
            let users = require('../storage/users.json')
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)

            let lastId;
            if (users.length === 0) {
                lastId = 0,
                users = [...users,{
                    id: lastId,
                    ...req.body
                }]
            }
            else {
                lastId =  users.reduce((a, b) => a.id > b.id? a: b).id
                users = [...users,{
                    id: lastId + 1,
                    ...req.body
                }]
            }

            fs.writeFileSync(path.join(__dirname.replace("\\controllers", ""), "storage", "users.json"), JSON.stringify(users))

            console.log(req.body)
            console.log("User Added !")

            res.writeHead(200)
            res.end("User Added !")
        }
    } catch (error) {
        res.writeHead(500)
        res.end("Error While saving your User, please try later")
    }
}

function deleteUser(req, res) {
    try {
        const { id } = req.params
        let users = require("../storage/users.json")

        users = users.filter(user => user.id !== parseInt(id))

        fs.writeFileSync(path.join(__dirname.replace("\\controllers", ""), "storage", "users.json"), JSON.stringify(users))

        console.log("User Deleted !")

        res.writeHead(200)
        res.end("User Deleted !")
    } catch (error) {
        res.writeHead(500)
        res.end("Error While deleting your User, please try later")
    }
}

async function modifyUser(req, res) {
    try {
        const { value, error } = schema.validate(req.body)
        if (error) {
            console.log("Invalid Data")
            res.writeHead(404)
            res.end()
        }
        else {
            let users = require('../storage/users.json')
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)

            const { id } = req.params

            users = users.map(user => user.id == parseInt(id) ? {...user, ...req.body }: user )
            fs.writeFileSync(path.join(__dirname.replace("\\controllers", ""), "storage", "users.json"), JSON.stringify(users))

            console.log(req.body)
            console.log("User Updated !")

            res.writeHead(200)
            res.end("User Updated !")
        }
    } catch (error) {
        res.writeHead(500)
        res.end("Error While changing your User, please try later")
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    modifyUser
}