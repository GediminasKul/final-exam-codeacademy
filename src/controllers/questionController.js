const {
  addQuestionToDb,
  getAllQuestions,
  updateQuestion,
  deleteQuestionFromDb,
  getAnswersFromDb,
  saveAnswerToDb,
  getQuestionAsc,
  getQuestionDesc,
  getAnswerAsc,
  getAnswerDesc,
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
    const result = await saveAnswerToDb(idFromToken, id, content);
    if (result.affectedRows === 1) {
      res.status(201).json('Answer succesfully added!');
      return;
    }
    res.status(400).json('Answer was not added!');
  } catch (error) {
    console.log('error in postAnswer ===', error);
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
  console.log(req.body);
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

async function patchQuestion(req, res) {
  const id = req.params;
  const { title, content } = req.body;
  try {
    const saveResult = await updateQuestion(id, title, content);
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

async function deleteQuestion(req, res) {
  const id = req.params;
  try {
    const saveResult = await deleteQuestionFromDb(id);
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

async function showQuestionAsc(req, res) {
  try {
    const artArr = await getQuestionAsc();
    res.json(artArr);
  } catch (error) {
    console.log('error in showQuestionAsc ===', error);
    res.sendStatus(500);
  }
}
async function showQuestionDesc(req, res) {
  try {
    const artArr = await getQuestionDesc();
    res.json(artArr);
  } catch (error) {
    console.log('error in showQuestionDesc ===', error);
    res.sendStatus(500);
  }
}
async function showAnswerDesc(req, res) {
  try {
    const artArr = await getAnswerDesc();
    res.json(artArr);
  } catch (error) {
    console.log('error in showAnswerDesc  ===', error);
    res.sendStatus(500);
  }
}
async function showAnswerAsc(req, res) {
  try {
    const artArr = await getAnswerAsc();
    res.json(artArr);
  } catch (error) {
    console.log('error in showAnswerAsc ===', error);
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
  showQuestionAsc,
  showQuestionDesc,
  showAnswerAsc,
  showAnswerDesc,
};
