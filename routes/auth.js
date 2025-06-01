const express = require("express")
const api = express.Router()
const {body, validationResult} = require("express-validator")
const {readSync, writeSync} = require("../utils/fileOperations")
const path = require("path")
const filePATH = path.join(__dirname, "../data/users.json")

api.post('/register', [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({min: 18}).withMessage('Age must be more then 18')
],


(req, res)=>{
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


    const persone = {
        name:name,
        age:age,
        password:password,
        email:email,
        role:"user"
    }
    USERS[email] = persone; 
    res.status(201).json({"message":'User was created'})

    writeSync(filePATH, USERS);
})




module.exports = api