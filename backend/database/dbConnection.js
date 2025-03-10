const mongoose=require("mongoose")

const dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log("Failed to connect database")
    })
}
module.exports=dbConnect