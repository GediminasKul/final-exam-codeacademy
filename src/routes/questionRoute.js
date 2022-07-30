const express = require('express');

const {
  validateQuestion,
  validateToken,
  validateAnswer,
} = require('../middleware');
const controller = require('../controllers/questionController');

const questionRoutes = express.Router();

questionRoutes.get('/questions', controller.getQuestions);

questionRoutes.post(
  '/questions',
  validateToken,
  validateQuestion,
  controller.addNewQuestion
);

questionRoutes.patch(
  '/questions/:id',
  validateToken,
  validateQuestion,
  controller.patchQuestion
);

questionRoutes.delete(
  '/questions/:id',
  validateToken,
  controller.deleteQuestion
);

questionRoutes.get('/questions/:id/answers', controller.getAnswers);

questionRoutes.post(
  '/questions/:id/answers',
  validateToken,
  validateAnswer,
  controller.postAnswer
);

module.exports = questionRoutes;
