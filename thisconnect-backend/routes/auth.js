const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/UserRegister'); 
const { loginUser } = require('../controllers/UserLogin');
const { logoutUser } = require('../controllers/UserLogout');


router.post('/register', registerUser); 
router.post('/login', loginUser)
router.post('/logout', logoutUser);



module.exports = router;
