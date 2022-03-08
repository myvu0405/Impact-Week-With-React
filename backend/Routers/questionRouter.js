const express = require('express')
const questionRouter = express.Router();
const controller = require('../controllers/questionController')
const {isLoggedIn,protectedRoute } = require('../middleWares/authMiddleWare')

questionRouter.get('/all-questions', protectedRoute, controller.getQuestions)

questionRouter.post('/addQuestion', protectedRoute, controller.addQuestion)

questionRouter.get('/showOneQuestion/:id', protectedRoute, controller.showOneQuestion)

questionRouter.delete('/deleteQuestion/:id', protectedRoute, controller.delQuestion)

questionRouter.post('/editQuestion/:id', protectedRoute, controller.editQuestion)

questionRouter.get('/editQuestion/:id', protectedRoute, controller.editGetQuestion)

module.exports = questionRouter