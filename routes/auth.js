const express = require("express")
const api = express.Router()
const {body, validationResult} = require("express-validator")
const {readSync, writeSync} = require("../utils/fileOperations")
const path = require("path")
const filePATH = path.join(__dirname, "../data/users.json")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const sec = process.env.SECRET_KEY
const bcrypt = require("bcrypt")

api.post('/register', [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({min: 18}).withMessage('Age must be more then 18')
],


async (req, res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({"message ": "validation error"})
    }

    const {name, age, password, email} = req.body;

    const USERS = readSync(filePATH)
    if(!USERS){
        return res.status(501).json({"message":'note implemented'})
    }

    if(USERS[email]){
        return res.status(409).json({"message":'note implemented'})
    }

    

    const passnew = await bcrypt.hash(password, 10)

    const persone = {
        name:name,
        age:age,
        password: passnew,
        email:email,
        role:"user"
    }
    USERS[email] = persone; 
    res.status(201).json({"message":'User was created'})

    writeSync(filePATH, USERS);
})

api.post("/login", async(req, res)=>{
    const {email, password}=req.body;
    const USERS = readSync(filePATH);
    if(USERS[email]){
        if( await bcrypt.compare(password, USERS[email].password)){
            var token = jwt.sign({
                "email":USERS[email].email,
                "password":USERS[email].password,
                "role": USERS[email].role
            }, sec, {expiresIn: 1000000})
            res.status(200).json({"token":token})
        }else{
            return res.status(400).json({message: "bad request"})
        }
    }
    else{
        return res.status(404).json({"message":"email or password is incorect"})
    }
});


module.exports = api