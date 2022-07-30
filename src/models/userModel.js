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

function saveUser(name, email, password) {
  const sql = 'INSERT INTO users(name, email, password) VALUES (?, ?, ?)';
  return executeDb(sql, [name, email, password]);
}

function findUserByEmail(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  return executeDb(sql, [email]);
}

module.exports = {
  saveUser,
  findUserByEmail,
};
