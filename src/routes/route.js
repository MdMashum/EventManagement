const express = require('express');
const router = express.Router();
const userController = require('../controller/user.Controller');

router.post('/register', userController.userRegister); 
router.post('/login', userController.login); 
router.post('/logout', userController.logout)


module.exports = router; 

