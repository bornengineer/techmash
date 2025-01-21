import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/db.js";

export const createRankingTable = async () => {
  try {
    // Check if the table already exists
    const checkTableQuery = `
        SELECT EXISTS (
          SELECT 1 
          FROM information_schema.tables 
          WHERE table_name = 'ranking_table'
        );
      `;
    const result = await pool.query(checkTableQuery);

    // If the table exists, skip creation and seeding
    if (result.rows[0].exists) {
      console.log(
        "Table 'ranking_table' already exists. Skipping creation and seeding."
      );
      return;
    }

    // Create the table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ranking_table (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      rating INTEGER NOT NULL DEFAULT 1400,
      image BYTEA NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    await pool.query(createTableQuery);
    console.log("Table 'ranking_table' created successfully.");
    await seedData();
  } catch (error) {
    console.error("Error creating table:", error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export const seedData = async () => {
  // ES module replacement for __dirname
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const imagesFolder = path.join(__dirname, "images");

  try {
    const files = fs
      .readdirSync(imagesFolder)
      .filter((file) => file.endsWith(".webp"));

    for (const file of files) {
      const name = path.parse(file).name; // File name without extension
      const imageBuffer = fs.readFileSync(path.join(imagesFolder, file)); // Read file as binary data
      const insertQuery = `
        INSERT INTO ranking_table (name, rating, image)
        VALUES ($1, $2, $3)
        ON CONFLICT (name) DO NOTHING;
      `;
      await pool.query(insertQuery, [name, 1400, imageBuffer]);
    }

    console.log("Data seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
