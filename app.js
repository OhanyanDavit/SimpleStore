const express = require("express")
require("dotenv").config()
const auth = require("./routes/auth")

const app = express()

app.use(express.json())
app.use("/auth", auth)

app.listen(process.env.PORT, ()=>{console.log(`Project runs in port https://localhost:${process.env.PORT}: `)})