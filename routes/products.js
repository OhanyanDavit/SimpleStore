const express = require("express")
const api = express.Router()
const {readSync, writeSync} = require("../utils/fileOperations")
const path = require("path")
const filePATH = path.join(__dirname, "../data/products.json")
const jwt = require("jsonwebtoken")
const authenticateJWT = require("../middleware/authenticateJWT")
const authorizeRole = require("../middleware/authorizeRole")
require("dotenv").config()
const sec = process.env.SECRET_KEY

api.get("/", (req, res)=>{
    const PROD = readSync(filePATH)

    if(!PROD){
        return res.status(501).json({message:"not implemented"})
    }
    res.status(200).json({PROD})
    
})

api.post("/", (req, res)=>{
    const PROD = readSync(filePATH)
    const {name, price, color, count} = req.body;

    const prod = {
        price:price,
        color:color,
        count: count
    }
    PROD[name]=prod
    
    writeSync(filePATH, PROD)
    return res.status(200).json({message:"it was success"})
})

api.delete("/", (req, res)=>{
    const {name}  = req.body;
    const PROD = readSync(filePATH)

    if(PROD[name]){
        delete PROD[name]
        writeSync(filePATH, PROD)
        return res.status(200).json({message:"it was success"})
    }else{
        return res.status(502).json({message:"bad request"})

    }


})

module.exports = api