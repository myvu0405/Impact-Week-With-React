//Created by My Vu
const express = require('express');
const answerRouter = express.Router();
const controller = require('../controllers/answerController');
const {isLoggedIn } = require('../middleWares/authMiddleWare');

answerRouter.post('/addAnswer', isLoggedIn, controller.addAnswer);

answerRouter.get('/deleteAnswer/:id', isLoggedIn, controller.delAnswer);

answerRouter.all('/editAnswer/:id', isLoggedIn, controller.editAnswer);

module.exports = answerRouter;