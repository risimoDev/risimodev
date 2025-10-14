const mysql = require('mysql2');
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    console.log('Please make sure MySQL is running and the database is created.');
    console.log('You can use the database-setup.sql script to create the database.');
    return;
  }
  console.log('Successfully connected to the database.');
});

module.exports = connection;