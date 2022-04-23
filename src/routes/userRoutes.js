const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/login', userController.login);
router.get('/register', userController.register);
router.post('/register', userController.dataRegister);

module.exports = router;