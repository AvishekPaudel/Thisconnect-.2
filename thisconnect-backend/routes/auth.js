const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/UserRegister'); 
const { loginUser } = require('../controllers/UserLogin');


router.post('/register', registerUser); 
router.post('/login', loginUser)


module.exports = router;
