require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
};

console.log(dbConfig);

const PORT = +process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;

module.exports = {
  dbConfig,
  PORT,
  jwtSecret,
};
