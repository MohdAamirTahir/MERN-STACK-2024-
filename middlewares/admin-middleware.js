const adminMiddleware = async(req,res,next)=>{
     try{
      //req.user hame auth-middleware se mileg
       const adminRole = req.user.isAdmin;
       if(!adminRole){
       return res.status(403).send({message:"Access denied.User is not an admin"})
       }else{
          next()  //age ja bhai
       }
     }catch(error){
        console.log(error)
        nect(error)
     }
}

module.exports = adminMiddleware