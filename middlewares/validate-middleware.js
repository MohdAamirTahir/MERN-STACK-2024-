const validate = (schema)=>async(req,res,next)=>{
    try{
      const parseBody = await schema.parseAsync(req.body); 
      //yaha jo data a raha hota h use pase karke dekhte ki thik a raha h ya nahi agar sab thik h to next

      req.body = parseBody;
      next();
    }catch(err){
        const status = 422;
        const message = "fill the input properly";
        const extraDetails= err.errors[0].message;
        //yaha per extraDetails main error ko le liya or erro variable main rakh diya or next kar diya
       // yaha se error message show hota h
      //  res.status(400).json({message:message})
      const error={
        status,
        message,
        extraDetails
      }
      next(error)    //yaha se next ko bhej diya error middleware ko
    }
}

module.exports = validate;