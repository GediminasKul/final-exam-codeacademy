const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

async function validateRegister(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().trim().min(4).max(30).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(5).max(20).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('error in validateUserAsync ===', error);
    const formatedError = error.details.map((eObj) => ({
      message: eObj.message,
      field: eObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().trim().min(5).max(20).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('error in validateLoginAsync ===', error);
    const formatedError = error.details.map((eObj) => ({
      message: eObj.message,
      field: eObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateQuestion(req, res, next) {
  const schema = Joi.object({
    title: Joi.string().trim().min(10).max(255).required(),
    content: Joi.string().trim().min(5).max(500).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('error in validateQuestion ===', error);
    const formatedError = error.details.map((eObj) => ({
      message: eObj.message,
      field: eObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateAnswer(req, res, next) {
  const schema = Joi.object({
    content: Joi.string().trim().min(5).max(500).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('error in validateAnswer ===', error);
    const formatedError = error.details.map((eObj) => ({
      message: eObj.message,
      field: eObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];
  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
    return;
  }
  try {
    const tokenPayLoad = jwt.verify(tokenFromHeaders, jwtSecret);
    const { userId } = tokenPayLoad;
    req.userId = userId;
    next();
  } catch (error) {
    console.log('error in validateToken  ===', error);
    res.status(403).json({
      success: false,
      error: 'Invalid token',
    });
  }
}

module.exports = {
  validateRegister,
  validateToken,
  validateLogin,
  validateQuestion,
  validateAnswer,
};
