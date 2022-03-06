const express = require('express')
const questionRouter = express.Router();
const controller = require('../controllers/questionController')
const {isLoggedIn, protectedRoute } = require('../middleWares/authMiddleWare')

questionRouter.get('/questions', protectedRoute, controller.getQuestions)

questionRouter.all('/addQuestion', protectedRoute, controller.addQuestion)

questionRouter.get('/showOneQuestion/:id', isLoggedIn, controller.showOneQuestion)

questionRouter.get('/deleteQuestion/:id', isLoggedIn, controller.delQuestion)

questionRouter.all('/editQuestion/:id', isLoggedIn, controller.editQuestion)

module.exports = questionRouter