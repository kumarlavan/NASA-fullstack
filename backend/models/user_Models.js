const mongoose=require("mongoose")

const user_schema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    mailId:String,
    password:String,
    gender:String,
    mobileNumber:String,
    imageurl:String
})

const User=mongoose.model("user",user_schema)

module.exports={User}