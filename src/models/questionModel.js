const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    throw new Error('error in executeDb === ', error);
  } finally {
    conn?.end();
  }
}

function getAllQuestions() {
  const sql = 'SELECT * FROM questions WHERE archived=0 ';
  return executeDb(sql, []);
}

function addQuestionToDb(title, content, user_id) {
  const sql =
    'INSERT INTO questions (title, content, user_id) VALUES (?, ?, ?)';
  return executeDb(sql, [title, content, user_id]);
}

// not finished
function updateQuestion(id, user_id, title, content) {
  const sql = `UPDATE questions SET title = ?, content = ? WHERE id=${id.id} AND user_id=${user_id} `;
  return executeDb(sql, [user_id, title, content]);
}

// not finished
function deleteQuestionFromDb(id, user_id) {
  const sql = `UPDATE questions SET archived=1 WHERE id=${id.id} AND user_id=${user_id}`;
  return executeDb(sql, [id, user_id]);
}

function getAnswersFromDb(id) {
  const sql = `SELECT * FROM answers WHERE question_id=${id.id} AND archived=0 `;
  return executeDb(sql, [id]);
}

function saveAnswerToDb(user_id, question_id, content) {
  const sql =
    'INSERT INTO answers (user_id, question_id, content) VALUES (?, ?, ?)';
  return executeDb(sql, [user_id, question_id, content]);
}

module.exports = {
  addQuestionToDb,
  getAllQuestions,
  updateQuestion,
  deleteQuestionFromDb,
  saveAnswerToDb,
  getAnswersFromDb,
};
