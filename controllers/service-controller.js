const Service = require('../models/service-model');


const services = async (req,res,next)=>{
   try{
      const result=await Service.find()
      return res.status(200).json({message:result})
   }catch(error){
    return res.status(400).json({message:error})
     next(error)
}
}

module.exports = services