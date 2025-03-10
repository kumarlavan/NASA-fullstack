require("dotenv").config()
const express=require("express")
const cors=require("cors")
const dbConnect = require("./database/dbConnection")
const routes = require("./routes/router")

const app=express()
//! database connection
dbConnect()

//! use middleware
app.use(express.json())
app.use(cors())
app.use("/api",routes)


app.listen(process.env.PORT,()=>{
console.log(`the backend server is running in http://localhost:${process.env.PORT}`)
})