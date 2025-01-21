import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT,
  // host: process.env.DB_HOST,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000,
  max: 10, // Maximum number of connections in the pool
});

pool.on("connect", () => {
  console.log("Connection pool established with Database!");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

export default pool;
