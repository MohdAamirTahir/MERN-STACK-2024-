const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const authMiddleware = async(req,res,next) =>{
   const token = req.header("Authorization");
   if(!token){
   return res.status(401).json({message:"UnAuthorized token not provide"})
   }
   const jwtToken = token.replace("Bearer","").trim()
   try{
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SCREATE_KEY)   //ye match karta h token with screate key when 
   
    const userData = await User.findOne({email:isVerified.email})
    .select({
        password:0    //matlab password chhodke sab dedo
    })

    req.user = userData;
    req.token = token;
    req.userID = userData._id;
     //jab hum is middleware ko use karenge to ye sab kahi per bhi use kar sakte h 
    next();

   }catch(error){
    return res.status(401).json({message:"UnAuthorized Invalid token."})
   }

   
}

module.exports = authMiddleware;