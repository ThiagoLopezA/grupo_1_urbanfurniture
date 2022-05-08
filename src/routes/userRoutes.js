const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Middlewares
const validationsRegister = require('../middlewares/validateRegisterMiddleware');
const validationsLogin = require('../middlewares/validateLoginMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


// Login
router.get('/login', guestMiddleware, userController.login);
router.post('/login', validationsLogin, userController.loginProcess);

// Register
router.get('/register', guestMiddleware, userController.register);
router.post('/register', validationsRegister, userController.registerProcess);

// Logout
router.get('/logout', userController.logout);

module.exports = router;