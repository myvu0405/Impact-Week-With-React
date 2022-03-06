const express = require('express')
const questionRouter = express.Router();
const controller = require('../controllers/questionController')
const {isLoggedIn,protectedRoute } = require('../middleWares/authMiddleWare')

questionRouter.get('/all-questions', protectedRoute, controller.getQuestions)

questionRouter.post('/addQuestion', protectedRoute, controller.addQuestion)

questionRouter.get('/showOneQuestion/:id', protectedRoute, controller.showOneQuestion)

questionRouter.get('/deleteQuestion/:id', isLoggedIn, controller.delQuestion)

questionRouter.all('/editQuestion/:id', isLoggedIn, controller.editQuestion)

module.exports = questionRouter