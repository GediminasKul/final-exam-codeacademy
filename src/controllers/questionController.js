const {
  addQuestionToDb,
  getAllQuestions,
  updateQuestion,
  deleteQuestionFromDb,
  getAnswersFromDb,
  saveAnswerToDb,
} = require('../models/questionModel');

async function getAnswers(req, res) {
  const id = req.params;
  try {
    const answerArr = await getAnswersFromDb(id);
    res.json(answerArr);
  } catch (error) {
    console.log('error in showAnswer ===', error);
    res.sendStatus(500);
  }
}

async function postAnswer(req, res) {
  const { content } = req.body;
  const { id } = req.params;
  const idFromToken = req.userId;
  try {
    const result = await saveAnswerToDb(id, idFromToken, content);
    if (result.affectedRows === 1) {
      res.status(201).json('Answer succesfully added!');
      return;
    }
    res.status(400).json('Answer was not added!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
}

async function getQuestions(req, res) {
  try {
    const questionsArr = await getAllQuestions();
    res.json(questionsArr);
  } catch (error) {
    console.log('error in getQuestions ===', error);
    res.sendStatus(500);
  }
}

async function addNewQuestion(req, res) {
  const { title, content } = req.body;
  const idFromToken = req.userId;
  console.log('idFromToken ===', idFromToken);
  try {
    const saveResult = await addQuestionToDb(title, content, idFromToken);
    if (saveResult.affectedRows === 1) {
      res.status(201).json('Question successfully added');
      return;
    }
    res.status(400).json('Question was not added');
  } catch (error) {
    console.log('error in addNewQuestion ===', error);

    res.sendStatus(500);
  }
}

// nebaigtas
async function patchQuestion(req, res) {
  const id = req.params;
  const { title, content } = req.body;
  const idFromToken = req.userId;
  try {
    const saveResult = await updateQuestion(id, idFromToken, title, content);
    if (saveResult.affectedRows === 1) {
      res.status(201).json('Question successfully edited');
      return;
    }
    res.status(400).json('Question was not edited');
  } catch (error) {
    console.log('error in pathcQuestion ===', error);
    res.sendStatus(500);
  }
}

// nebaigtas
async function deleteQuestion(req, res) {
  const id = req.params;
  const idFromToken = req.userId;
  try {
    const saveResult = await deleteQuestionFromDb(id, idFromToken);
    if (saveResult.affectedRows === 1) {
      res.status(201).json('Question successfully deleted');
      return;
    }
    res.status(400).json('Question was not deleted');
  } catch (error) {
    console.log('error in deleteQuestion ===', error);
    res.sendStatus(500);
  }
}

module.exports = {
  addNewQuestion,
  getQuestions,
  patchQuestion,
  deleteQuestion,
  getAnswers,
  postAnswer,
};
