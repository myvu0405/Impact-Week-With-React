const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

//login
// userRouter.all('/login', userController.logInFunc);
userRouter.post('/login', userController.logInFunc);
// signup
// userRouter.all('/signup', userController.signUpFunc);
userRouter.post('/signup', userController.signUpFunc);

// logout
// userRouter.post('/logout', userController.logOutFunc);

module.exports = userRouter;