require("dotenv").config();
const express= require("express");
const cors = require('cors');
const authRoute = require('./router/auth-router')
const contactRoute = require('./router/contact-router')
const serviceRoute= require('./router/service-route')
const adminRoute=require('./router/admin-router')
const app = express(); 
const PORT = 3000;
const {connectDB} = require('./utils/db')
const errorMiddleware = require('./middlewares/error-middleware')




// let's takel corse
const corsOptions = {
    origin:"http://localhost:5173",
    method:"GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials:true
}
app.use(cors(corsOptions))

app.use(express.json());
app.use("/api/auth",authRoute);   //auth controller is diffrent tologin register etc
app.use("/api/form",contactRoute); //form controller is differnt to save contact
app.use("/api/data",serviceRoute); //data controller is differnt to get data
app.use("/api/admin",adminRoute); //data controller is differnt to get data


//matlab ki jo bhi localhost:3000/api/auth ya fir form per jayega  tab ye dono chalenge kuch bhi name rak sakte h


app.use(errorMiddleware)


app.get('/register',(req,res)=>{
    res.status(200).send('Your register code is running')
})
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Your server is running on port ${PORT}`)
    })
}); 
