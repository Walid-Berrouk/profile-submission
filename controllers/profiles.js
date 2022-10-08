const { ref } = require('joi');
const joi = require('joi');
const fs = require('fs');
const path = require('path');

// Data we have :
// firstname
// lastname
// age
// email
// is student
// usename
// password


const schema = joi.object({
    firstname: joi.string()
        .pattern(new RegExp('^[a-zA-Z]{3,15}$')),
    
    lastname: joi.string()
    .pattern(new RegExp('^[a-zA-Z]{3,15}$')),

    age: joi.number()
    .integer()
    .min(16)
    .max(70),

    email: joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dz'] } }),

    isStudent: joi.boolean(),

    username: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')),
    
    password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,15}$')),


    })


function addProfile(req, res) {
    try {
        const { value, error } = schema.validate(req.body)
        if (error) {
            console.log("Invalid Data")
            res.writeHead(404)
            res.end()
        }
        else {

            let profiles = require("../storage/profiles.json")
            let lastId;
            if (profiles.length === 0) {
                lastId = 0,
                profiles = [...profiles,{
                    id: lastId,
                    ...req.body
                }]
            }
            else {
                lastId =  profiles.reduce((a, b) => a.id > b.id? a: b).id
                profiles = [...profiles,{
                    id: lastId + 1,
                    ...req.body
                }]
            }

            fs.writeFileSync(path.join(__dirname.replace("\\controllers", ""), "storage", "profiles.json"), JSON.stringify(profiles))

            console.log("Profile Added !")

            res.writeHead(200)
            res.end()
        }
    } catch (error) {
        res.writeHead(500)
        res.end("Error While saving your profile, please try later")
    }
}

function getProfiles(req, res) {
    try {
        const profiles = require('../storage/profiles.json')

        res.send(profiles)
    } catch (error) {
        res.writeHead(500)
        res.send("Sorry, Data inavailable !")
    }


}

module.exports = {
    addProfile,
    getProfiles
}