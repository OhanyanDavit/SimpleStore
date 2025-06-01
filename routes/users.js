const express = require("express")
const api = express.Router()
const {readSync, writeSync} = require("../utils/fileOperations")
const path = require("path")
const filePATH = path.join(__dirname, "../data/users.json")
const jwt = require("jsonwebtoken")
const authenticateJWT = require("../middleware/authenticateJWT")
const authorizeRole = require("../middleware/authorizeRole")
require("dotenv").config()
const sec = process.env.SECRET_KEY

api.get("/", authenticateJWT, authorizeRole('admin'), (req ,res)=>{
    const readed = readSync(filePATH);
    res.status(200).json({readed});
})

api.delete("/del", authenticateJWT, authorizeRole('admin'), (req ,res)=>{
    const readed = readSync(filePATH);
    const {email} = req.body;
    if(!readed[email]){
        return res.status(404).json({message:"Client not found"})
    }else{
        delete readed[email];
        writeSync(filePATH, readed)
        res.status(200).json({readed},{message:"action was success"});
    }

})

module.exports = api