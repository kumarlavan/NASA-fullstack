const express=require("express")
const { User } = require("../models/user_Models")

const routes=express.Router()
//! all users
routes.get("/users",async(req,res)=>{
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
   try {
      const existingUser=await User.findOne({mailId})
      if(existingUser){
         res.status(200).json({message:"user email is already exist"}) 
      }
      else{
         const result=await User.insertOne({firstName,lastName,age,mailId,password,gender,mobileNumber,imageurl})
         res.status(200).json({message:"User Register Successfully",userID:result._id})
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
               res.status(200).json({message:"logged In successfully",userId:cuurrUser._id})
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
routes.put("/update/:id",async(req,res)=>{
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
routes.delete("/deleteuser/:id",async(req,res)=>{
   const {id}=req.params
   try {
         await User.deleteOne({_id:id})
         res.status(200).json({message:`User is deleted successfully`})
     
   } catch (error) {
      res.status(500).json({message:"Internal Server Error",error})
   }
})



module.exports=routes