const express = require('express');
const { validateToken, validateAnswer } = require('../middleware');

const controller = require('../controllers/answerController');

const answerRoutes = express.Router();

answerRoutes.patch(
  '/answers/:id',
  validateToken,
  validateAnswer,
  controller.updateAnswer
);

answerRoutes.delete('/answers/:id', validateToken, controller.deleteAnswer);

module.exports = answerRoutes;
