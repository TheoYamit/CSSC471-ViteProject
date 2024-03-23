require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function query(sql, params) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

app.post('/register', async (req, res) => {
  const { username, password, firstName, lastName, email, address } = req.body;

  const insertUserQuery = `INSERT INTO registeredusers (Username, Password, First_name, Last_name, Email, Address) VALUES (?, ?, ?, ?, ?, ?)`

  const data = [username, password, firstName, lastName, email, address]
  console.log(data)

   try {
      await query(insertUserQuery, [username, password, firstName, lastName, email, address]);
      res.send({ status: "success", message: "User " + username + " has been successfully registered. You can now login." });
    } catch (error) {
      console.error("Error registering the user:", error);
      res.status(500).send({ status: "error", message: "Error registering user" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
