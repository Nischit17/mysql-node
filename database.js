// Import the mysql2 package to interact with a MySQL database
import mysql from "mysql2";

// Import the dotenv package to load environment variables from a .env file
import dotenv from "dotenv";

// Load environment variables from the .env file into process.env
dotenv.config();

// Create a MySQL connection pool with database credentials from environment variables
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST, // Database host (e.g., localhost)
    user: process.env.MYSQL_USER, // Database username
    password: process.env.MYSQL_PASSWORD, // Database password
    database: process.env.MYSQL_DATABASE, // Database name
  })
  .promise(); // Enables the use of Promises with MySQL queries

// Function to fetch all notes from the 'notes' table
const getNotes = async () => {
  const [rows] = await pool.query("SELECT * FROM notes"); // Execute a SQL query to get all notes
  return rows; // Return the retrieved notes
};

// Function to fetch a specific note by its ID
const getNotesById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
  return rows[0]; // Return the first matching note (assuming ID is unique)
};

// Function to create a new note in the database
const createNote = async (title, contents) => {
  const [result] = await pool.query(
    `INSERT INTO notes (title, contents) VALUES (?, ?)`, // Insert a new note
    [title, contents] // Use parameterized queries to prevent SQL injection
  );
  const id = result.insertId; // Get the ID of the newly inserted note
  return getNotesById(id); // Retrieve and return the newly created note
};

// Call the createNote function with sample data and log the result
const result = await createNote("test6", "test9");
console.log(result); // Output the newly created note to the console
