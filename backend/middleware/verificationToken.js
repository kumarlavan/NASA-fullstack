const jwt=require("jsonwebtoken")

const authentication=(req,res,next)=>{
    const token=req.headers['authorization']?.split(" ")[1]
    console.log(token)
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
        if(err){
            res.status(401).json({message:"Access Denied"})
        }
        else{
            req.user=user
            next()
        }
    })
}
module.exports=authentication