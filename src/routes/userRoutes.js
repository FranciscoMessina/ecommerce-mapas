const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');

// Validaciones
const registerValidation = require('../middlewares/registerValidation');
const loginValidation = require('../middlewares/loginValidation');
// Middlewares auth
const guestCheck = require('../middlewares/guestCheck');
const authCheck = require('../middlewares/authCheck');

userRoutes.get('/login', guestCheck, userController.login);
userRoutes.post('/login', loginValidation, userController.processLogin);

userRoutes.get('/register', guestCheck, userController.register);
userRoutes.post('/register', registerValidation, userController.processRegister);

userRoutes.get('/profile', authCheck, userController.profile);
userRoutes.get('/logout', authCheck, userController.logout);

module.exports = userRoutes;
