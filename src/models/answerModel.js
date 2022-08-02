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

function patchAnswer(id, content) {
  const sql = `UPDATE answers SET content = ? WHERE id=${id.id}`;
  return executeDb(sql, [content]);
}

function deleteAnswerFromDb(id, user_id) {
  const sql = `UPDATE answers SET archived=1 WHERE id=${id.id} AND user_id=${user_id}`;
  return executeDb(sql, [id, user_id]);
}

module.exports = {
  deleteAnswerFromDb,
  patchAnswer,
};
