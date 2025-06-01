const path = require("path")
const fs = require("fs")

const writeSync = (filename, data) =>{
    fs.writeFileSync(filename, JSON.stringify(data, null, 2))
}

const readSync = (filename) =>{
    return JSON.parse(fs.readFileSync(filename, "utf-8"))
}


module.exports={readSync, writeSync}