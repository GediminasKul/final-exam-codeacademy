const bcryptjs = require('bcryptjs');
const { saveUser, findUserByEmail } = require('../models/userModel');
const { passWordsMatch, generateJwtToken } = require('../utils/helper');

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const plainTextPassword = password;
    const hashedPassword = bcryptjs.hashSync(plainTextPassword, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const insertResult = await saveUser(
      newUser.name,
      newUser.email,
      newUser.password
    );

    if (insertResult === false) {
      res.status(500).json('something went wrong');
      return;
    }
    res.status(201).json('user created');
  } catch (error) {
    console.log('error in register user ===', error);
    res.status(500).json('Cannot create user');
  }
}

async function loginUser(req, res) {
  const receivedEmail = req.body.email;
  const receivedPassword = req.body.password;

  const foundUserArr = await findUserByEmail(receivedEmail);

  const foundUser = foundUserArr[0];

  if (!foundUser) {
    res.status(400).json('Email or password not found');
    return;
  }
  if (!passWordsMatch(receivedPassword, foundUser.password)) {
    res.status(400).json('Email or password not found');
    return;
  }

  const payload = { userId: foundUser.id };
  const token = generateJwtToken(payload);
  res.json({ success: true, token });
}

module.exports = {
  registerUser,
  loginUser,
};
