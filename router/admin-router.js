const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin-controller')
const authMiddleware = require('../middlewares/auth-middleware')
const adminMiddleware = require('../middlewares/admin-middleware')


 //ye pehle auth middleware per jayega wha per chaek karega ki isne login kiya h ya nahi 
 //jisse uska token banega  pehle authMiddleware fir adminMiddleware fir age jayega
router.route('/user').get(authMiddleware,adminMiddleware,adminController.getAllUsers);  

router.route('/contact').get(authMiddleware,adminMiddleware,adminController.getAllContact);

router.route('/contact/delete/:id').delete(authMiddleware,adminMiddleware,adminController.deleteContactById);


router.route('/ ').get(adminController.getAllService);

router.route('/user/:id').get(authMiddleware,adminMiddleware,adminController.getUserById);  //get data of the single user

router.route('/user/update/:id').patch(authMiddleware,adminMiddleware,adminController.updateUserById); 

router.route('/user/delete/:id').delete(authMiddleware,adminMiddleware,adminController.deleteUserById);


module.exports = router