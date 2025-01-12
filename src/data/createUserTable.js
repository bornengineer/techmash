import pool from "../config/db.js";

const createUserTable = () => {
  const queryText = `
        CREATE TABLE IF NOT EXISTS users(
        id  SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW())
        `;
  try {
    const res = pool.query(queryText);
    console.log("users table created if not exists");
  } catch (err) {
    console.log("Error creating user table :", err);
  }
};

export default createUserTable;
