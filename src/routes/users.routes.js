const express = require('express');
const router = express.Router();
const { renderLogin, renderRegister, login, register, logout} = require('../controllers/users.controller')


// Register routes 
router.get('/users/singup', renderRegister);
router.post('/users/singup',  register);

// Login routes 

router.get('/users/singin', renderLogin);
router.post('/users/singin', login);

// Logout 
router.get('/users/logout', logout);

module.exports = router;
