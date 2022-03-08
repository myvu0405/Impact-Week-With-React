const express = require('express')
const questionRouter = express.Router();
const controller = require('../controllers/questionController')
const {isLoggedIn,protectedRoute } = require('../middleWares/authMiddleWare')

questionRouter.get('/all-questions', protectedRoute, controller.getQuestions)

questionRouter.post('/addQuestion', protectedRoute, controller.addQuestion)

questionRouter.get('/showOneQuestion/:id', protectedRoute, controller.showOneQuestion)

questionRouter.delete('/deleteQuestion/:id', protectedRoute, controller.delQuestion)

questionRouter.all('/editQuestion/:id', protectedRoute, controller.editQuestion)

module.exports = questionRouter