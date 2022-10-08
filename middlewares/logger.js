const fs =  require("fs");
const path = require("path");

const myLogger = function (req, res, next) {
    console.log(`A new request with method ${req.method} at ${req.url} received at ${Date.now()}` + (Object.keys(req.body).length !== 0  ? ` With following infos : lastname : ${req.body.lastname}; firstname : ${req.body.firstname};` : ""));


    fs.appendFileSync(path.join(__dirname.replace("\\middlewares", ""), "storage", "logs.txt"), `A new request with method ${req.method} at ${req.url} received at ${Date.now()}` + (Object.keys(req.body).length !== 0 ? ` With following infos : lastname : ${req.body.lastname}; firstname : ${req.body.firstname};\n` : "\n"))


    next();
}

module.exports = myLogger