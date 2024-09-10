const User = require('../models/user-model'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');


//* Register *//
const register = async (req, res ,next) => {
  try {
    console.log(req.body);
    const{username,email,phone,password}=req.body;
    const UserExist = await User.findOne({email:email});

    if(UserExist){
       return res.status(400).json({message:"Email Already Exist"})
    }

      const Createdata = await User.create({username,email,phone,password})      //await promisse return karta h
     
      res.status(200).json({
        message:"Registration successfull",
        token: await Createdata.generateToken(),     //yaha se function call hua or waha se return data hua
        userId: Createdata._id.toString(),
      })

  } catch (error) {
      return next(error);
  }
};

//* Home *//
const home = async(req,res)=>{
  try{
  const email = req.body;
  res.status(200).send({message:email})
  }catch(error){
    return next(error)
  }
}

//*Login*//
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const UserExist = await User.findOne({ email });
    
    // Check if user exists
    if (!UserExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await UserExist.compairPassword(password);
    if (isMatch) {
      res.status(200).json({
        message: "Login successful",
        token: await UserExist.generateToken(),  // Ensure this function is correctly defined
        userId: UserExist._id.toString(),
      });
    } else {
      // Handle invalid password case
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    // Log the error and pass it to the next middleware
    console.error('Login error:', error);
    next(error);
  }
};


// To send user logic data
const user = async(req,res)=>{
   try{
       const userData = req.user;
       res.status(200).json({userData})
   }catch(error){
      console.log(`error from the user route ${error}`)
   }
}


module.exports = { register, home, login, user};  
