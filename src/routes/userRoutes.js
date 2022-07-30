const express = require('express');

const { validateLogin, validateRegister } = require('../middleware');
const controller = require('../controllers/userController');
const { saveUser } = require('../models/userModel');
// const { registerUser, loginUser } = require('../controllers/userController');

const userRoutes = express.Router();

userRoutes.post('/register', validateRegister, controller.registerUser);

userRoutes.post('/login', validateLogin, controller.loginUser);

module.exports = userRoutes;
