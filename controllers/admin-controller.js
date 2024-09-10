const User = require('../models/user-model')
const Contact = require('../models/contact-model')
const Service = require('../models/service-model')

// All User Get
const getAllUsers = async(req ,res ,next)=>{
   try{
      const users = await User.find({},{password:0});

      if(!users || users.length===0){
        return res.status(400).send({message:"No users found"});

      } 
       return res.status(200).send(users);
   }catch(error){
    next(error)
}
}

// All Contact Get
const getAllContact= async(req ,res ,next)=>{
    try{
       const contact = await Contact.find();
       if(!contact || contact.length===0){
         return res.status(400).send({message:"No Contact found"});
       } 
        return res.status(200).send(contact);
    }catch(error){
     next(error)
 }
 }

 // All Service Get
 const getAllService = async(req ,res ,next)=>{
    try{
       const service = await Service.find();
       if(!service || service.length===0){
         return res.status(400).send({message:"No Service found"});
       } 
        return res.status(200).send({message:service});
    }catch(error){
     next(error)
 }
 }

// get data of single user process
 const getUserById = async(req,res)=>{
   try{
      const id = req.params.id;
      const user = await User.find({_id:id},{password:0});
       return res.status(200).send(user);
   }catch(error){
       next(error)
   }
}

 // delete process
 const deleteUserById = async(req,res)=>{
    try{
       const id = req.params.id;
       const response = await User.deleteOne({_id:id});
       return res.status(200).json({message:"User Deleted Successfully !"})
    }catch(error){
       next(error)
    }
 }

 const deleteContactById = async(req,res)=>{
   try{
      const id = req.params.id;
      const response = await Contact.deleteOne({_id:id});
      return res.status(200).json({message:"User Deleted Successfully !"})
   }catch(error){
      next(error)
   }
 }
// update logic 
const updateUserById = async(req,res)=>{
   try{
      const id = req.params.id;
      const updatedUserData = req.body;    //isse hum jo body main likhenge to get kar lega
      const updateddata= await User.updateOne({_id:id},{$set:updatedUserData})
      return res.status(200).json(updateddata)
   }catch(error){
      next(error)
   }
}

module.exports = { getAllUsers ,getAllContact , getAllService ,deleteUserById ,getUserById,updateUserById,deleteContactById}