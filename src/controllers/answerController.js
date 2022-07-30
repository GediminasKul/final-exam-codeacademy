const { patchAnswer, deleteAnswerFromDb } = require('../models/answerModel');

async function updateAnswer(req, res) {
  const id = req.params;
  // // const userId = req.params;
  // const user_id = req.params;
  const idFromToken = req.userId;
  const { content } = req.body;

  try {
    const updateResult = await patchAnswer(id, content, idFromToken);
    if (updateResult.affectedRows === 1) {
      res.status(201).json('Answer updated successfully');
      return;
    }
    res.status(400).json('Answer update fail');
  } catch (error) {
    console.log('error in updateAnswer ===', error);
    res.status(500).json('Something went wrong');
  }
}

async function deleteAnswer(req, res) {
  const id = req.params;
  try {
    const deleteResult = await deleteAnswerFromDb(id);
    if (deleteResult.affectedRows === 1) {
      res.status(201).json('Answer successfully deleted');
      return;
    }
    res.status(400).json('Answer delete fail');
  } catch (error) {
    console.log('Answer was not deleted ===', error);
    res.status(500).json('Something went when deleting answer');
  }
}

module.exports = {
  updateAnswer,
  deleteAnswer,
};
