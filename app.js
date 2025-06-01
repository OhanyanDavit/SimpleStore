const express = require("express")
require("dotenv").config()
const auth = require("./routes/auth")
const prod = require("./routes/products")
const users = require("./routes/users")

const app = express()

app.use(express.json())
app.use("/auth", auth)
app.use("/products", prod)
app.use("/user", users)

app.listen(process.env.PORT, ()=>{console.log(`Project runs in port https://localhost:${process.env.PORT}: `)})