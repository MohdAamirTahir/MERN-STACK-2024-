const  {z} = require("zod");       // use the zod validation 

const loginSchema = z.object({
    email:
    z.string({required_error:"Email is requierd"})
    .trim()
    .email({message:"Invalid Email Address"})
    .min(3,{ message:"Email Must Be At least of 3 chars" })
    .max(255,{ message:"Email Must Be More than 255 characters" }),
    password:
    z.string({message:"Password Is Required"})
    .trim()
    .min(3,{ message:"password Must Be At least of 7characters" })
    .max(20,{ message:"password Must Must Be More than 20 characters" }),

})
//extend means jo login main vo to rahega or jo isme h vo bh rahe gi kyoki 
// email and password upr rakh diye na to

const signupSchema = loginSchema.extend({
    username:
    z.string({required_error:"Name Is Required"})
    .trim()
    .min(3,{ message:"Name Must Be At least of 3 chars" })
    .max(255,{ message:"Name Must Be More than 255 characters" }),
    phone:
    z.string({message:"Phone number is required"})
    .trim()
    .min(10,{ message:"Phone number Must Be At least of 10 characters" })
    .max(20,{ message:"Phone number Must Be More than 20 characters" }),
    
})
module.exports = {signupSchema , loginSchema};



//yaha se message validate middleware per jayega or waha se error middleware per fir frontend per
