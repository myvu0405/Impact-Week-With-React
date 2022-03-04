const express = require('express')
const mainRouter = express.Router();
const mainController = require('../controllers/mainController')

const {isLoggedIn } = require('../middleWares/authMiddleWare')

mainRouter.get('/', isLoggedIn, mainController.getHomePage)

mainRouter.get('/questions', isLoggedIn, mainController.getHomePage)

module.exports = mainRouter