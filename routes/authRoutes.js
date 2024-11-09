const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// logs the user in
router.post('/login', authController.login);

// Registers a new user
router.post('/register', authController.register);

// allows user to change their password
router.post('/change_password', authController.changePassword);

module.exports = router;
