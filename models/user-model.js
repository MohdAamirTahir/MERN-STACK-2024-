const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre("save",async function (next){
    const user = this;
    if(!user.isModified("password")){
        next()
    }
    try{
        const saltround = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password,saltround);
        next();  //ye likhn bhi jaruri h
    }catch(error){
        next(error)
    }
})

//Json Web token
UserSchema.methods.generateToken = async function(password){
  try{ 
    const token = jwt.sign(
      {
          userId: this._id.toString(),
          email: this.email,
          isAdmin: this.isAdmin,
      },
      process.env.JWT_SCREATE_KEY,  // Ensure this is correctly loaded
      {
          expiresIn: "30d"
      }
  );
  return token;
     
  }catch(error){
     console.log(error);
  }
}

UserSchema.methods.compairPassword = async function(password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch; 
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error; 
  }};

const User = mongoose.model('User', UserSchema);

module.exports = User;
