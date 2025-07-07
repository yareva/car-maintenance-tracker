
require('dotenv').config({ path: '../.env.local' });

const express = require('express');
const app = express();
const mysql = require('mysql2');
const PORT = 3000;

app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Test db connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to MySQL db');
    connection.release();
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});