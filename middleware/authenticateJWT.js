const jwt = require("jsonwebtoken")
require("dotenv").config()

function authenticateJWT(req, res, next){
    const token = req.get('authorization');

    if (!token) {
        return res.status(401).json({ message: "Access token not found" });
    }

    const bearerToken = token.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY)

    req.user = decode
    next()
}
module.exports = authenticateJWT