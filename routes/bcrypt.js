const bcrypt = require("bcrypt")

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



bcrypt.hash(password, getRandomInt(1, 10), (err, result)=>{
    if(err){
        return "Error"
    }
    else{
        return result
    }
})

module.exports = bcrypt;