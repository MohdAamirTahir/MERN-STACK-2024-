const Contact = require('../models/contact-model');
const Router = require('../router/contact-router');


const ContactForm = async (req,res,next)=>{
   try{
     const response = req.body;
      await Contact.create(response)
      return res.status(200).json({message:"message send successfully"})
   }catch(error){
    return res.status(400).json({message:"Internal server error"})
     next(error)
}
}

module.exports = ContactForm