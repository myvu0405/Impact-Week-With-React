//Created by My Vu
const express = require('express');
const answerRouter = express.Router();
const controller = require('../controllers/answerController');
const {isLoggedIn, protectedRoute } = require('../middleWares/authMiddleWare');

answerRouter.post('/addAnswer', protectedRoute, controller.addAnswer);

answerRouter.delete('/deleteAnswer/:id', protectedRoute, controller.delAnswer);//MV updated method 'get' --> 'delete'

answerRouter.get('/oneAnswer/:id', protectedRoute, controller.getOneAnswer);//MV added

answerRouter.put('/editAnswer/:id', protectedRoute, controller.editAnswer);//MV updated 'all' --> 'put'

module.exports = answerRouter;