const express = require('express');
const router = express.Router();
const authControllers=require('../controllers/auth-controller');
const {signupSchema,loginSchema} = require('../validators/auth-validators');
const validate = require('../middlewares/validate-middleware');
const authMiddleware = require('../middlewares/auth-middleware');

router.route('/').get(authControllers.home);

router.route('/register').post(validate(signupSchema),authControllers.register)  
//yaha se validate function calll hoga or signupSchema lekar jayega or waha per usko parsAsync check karega 

router.route('/login').post(validate(loginSchema),authControllers.login)

router.route("/user").get(authMiddleware,authControllers.user)

//ye middleware check karta h ki jwt token rakha h k nahi OR user logedin h ya nahi

module.exports = router