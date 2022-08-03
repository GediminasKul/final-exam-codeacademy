const mysql = require('mysql2/promise');
const { dbConfig } = require('../config');

async function executeDb(sql, dataToDbArr) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArr);
    return result;
  } catch (error) {
    console.log('error in executeDb === ' + error.message);
  } finally {
    conn?.end();
  }
}

function getAllQuestions() {
  const sql = 'SELECT * FROM questions WHERE archived=0 ';
  return executeDb(sql, []);
}

// function getAllQuestions() {
//   const sql =
//     'SELECT questions.id, questions.user_id, questions.title, questions.content, questions.created_at, questions.edited_at, COUNT(answers.question_id) as answers FROM questions LEFT JOIN answers ON questions.id = answers.question_id WHERE questions.archived=0 OR answers.archived=0 GROUP BY answers.question_id';
//   return executeDb(sql, []);
// }

// function getAllQuestions() {
//   const sql =
//     'SELECT questions.id, questions.user_id, questions.title, questions.content, questions.created_at, questions.edited_at, questions.archived, COUNT(answers.question_id) as answers FROM questions LEFT JOIN answers ON questions.id = answers.question_id WHERE questions.archived=0 OR answers.archived=0 GROUP BY answers.question_id';
//   return executeDb(sql, []);
// }

function getQuestionAsc() {
  const sql =
    'SELECT * FROM questions WHERE archived=0 ORDER BY created_at ASC ';
  return executeDb(sql);
}

function getQuestionDesc() {
  const sql =
    'SELECT * FROM questions WHERE archived=0 ORDER BY created_at DESC ';
  return executeDb(sql);
}

// dar reikia pataisyti
function getAnswerAsc() {
  // sitas lygtais geras
  // const sql =
  //   'SELECT COUNT(id), question_id FROM answers GROUP BY question_id ORDER BY question_id ASC';
  const sql =
    'SELECT COUNT(id), question_id FROM answers GROUP BY question_id ORDER BY COUNT(id) ASC';
  return executeDb(sql);
}

// dar reikia pataisyti
function getAnswerDesc() {
  const sql =
    'SELECT COUNT(id), question_id FROM answers GROUP BY question_id ORDER BY COUNT(id) DESC';
  return executeDb(sql);
}

function addQuestionToDb(title, content, user_id) {
  const sql =
    'INSERT INTO questions (title, content, user_id) VALUES (?, ?, ?)';
  return executeDb(sql, [title, content, user_id]);
}

function updateQuestion(id, title, content) {
  const sql = `UPDATE questions SET title = ?, content = ? WHERE id=${id.id}`;
  return executeDb(sql, [title, content]);
}

function deleteQuestionFromDb(id) {
  const sql = `UPDATE questions SET archived=1 WHERE id=${id.id}`;
  return executeDb(sql, [id]);
}

function getAnswersFromDb(id) {
  const sql = `SELECT * FROM answers WHERE question_id=${id.id} AND archived=0`;
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
  getQuestionAsc,
  getQuestionDesc,
  getAnswerAsc,
  getAnswerDesc,
};
