const express=require("express")
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const { User } = require("../models/user_Models")
const authentication = require("../middleware/verificationToken")

const routes=express.Router()

const transportor=nodemailer.createTransport({
   service:"gmail",
   auth:{
      user:process.env.MY_MAIL,
      pass:process.env.MAIL_KEY,
   }
})







//! all users
routes.get("/users",authentication,async(req,res)=>{
   try {
    const result=await User.find({},{password:0,__v:0})
    res.status(200).json({message:"Data Fetches Successfully",result})
   } catch (error) {
    res.status(500).json({message:"Internal Server Error",error})
   }
})
//! create user
routes.post("/createuser",async(req,res)=>{
   const {firstName,lastName,age,mailId,gender,mobileNumber,imageurl,password}=req.body
   const mailoptions={
      from:process.env.MY_MAIL,
      to:mailId,
      subject:"Registration Successful – Welcome!",
      text:`Dear ${firstName},

We are pleased to inform you that your registration has been successfully completed! Welcome aboard!

Here are your registration details:

Username: ${firstName}
Email Address: ${mailId}
Registration Date: ${new Date().toLocaleString()}
Your password has been auto-generated following our password policy:

- **Password Rule**: The password is a combination of the following:
  1. **First Name** (capitalized),
  2. **Age**,
  3. **"@" symbol**, 
  4. **Last 3 digits of your mobile number**.

For example, if your name is John, age is 25, and your mobile number ends in 123, your password will be: **John25@123**
You can now access your account and enjoy all the features we offer. If you have any questions or need assistance, please feel free to contact us at [support email/phone].

Thank you for registering with us. We look forward to serving you!

Best regards,
MERN-NASA
mern.nasa@gmail.com`,
  }
   try {
      const existingUser=await User.findOne({mailId})
      if(existingUser){
         res.status(200).json({message:"user email is already exist"}) 
      }
      else{
         const result=await User.insertOne({firstName,lastName,age,mailId,password,gender,mobileNumber,imageurl})
         transportor.sendMail(mailoptions,(err,info)=>{
            if(err){
               console.log(err)
               res.status(500).json({message:"failed to send mail"})
            }
            else{
               console.log(info.response)
               res.status(200).json({message:"User Register Successfully.You will get a mail",userID:result._id})
            }
         })
      }
   } catch (error) {
      res.status(500).json({message:"Internal Server Error",error})
   }

})
//! login
routes.post("/login",async(req,res)=>{
   const {email,password}=req.body
   try {
         const cuurrUser=await User.findOne({mailId:email})
         if(!cuurrUser){
            res.status(404).json({message:"User Not Registered"})
         }
         else{
            if(cuurrUser.password===password){
               const token=jwt.sign({user:cuurrUser},process.env.JWT_SECRET_KEY,{expiresIn:"1hr"})
               res.status(200).json({message:"logged In successfully",currentuser:{imgurl:cuurrUser.imageurl,username:cuurrUser.firstName},token})
            }
            else{
               res.status(200).json({message:"Invalid Password"})
            }
         }


   } catch (error) {
      res.status(500).json({message:"Internal Server Error",error})
   }
})

//! fetch user by id

routes.get("/users/:id",async(req,res)=>{
   const {id}=req.params
   try {
      const currentuser=await User.findOne({_id:id},{password:0})
      res.status(200).json({message:"User fetched Successfully",currentuser})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error",error})
   }

})

//! update user by id
routes.put("/update/:id",authentication,async(req,res)=>{
   try {
      const {id}=req.params
   const {firstName,lastName,age,mailId,gender,mobileNumber,imageurl,password}=req.body
   const result=await User.updateOne({_id:id},{$set:{firstName,lastName,age,mailId,gender,mobileNumber,imageurl,password}})
   res.status(200).json({message:"User Updated Successfully"})
   } catch (error) {
      res.status(500).json({message:"Internal Server Error",error})
   }

})


//! delete
routes.delete("/deleteuser/:id",authentication,async(req,res)=>{
   const {id}=req.params
   try {
         await User.deleteOne({_id:id})
         res.status(200).json({message:`User is deleted successfully`})
     
   } catch (error) {
      res.status(500).json({message:"Internal Server Error",error})
   }
})



module.exports=routes