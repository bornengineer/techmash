import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import rankingRoutes from "./routes/ranking.route.js";
import errorHandling from "./middlewares/errorHandler.js";
import { createRankingTable } from "./data/createRankingTable.js";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", rankingRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Error handling middleware
app.use(errorHandling);

// Create ranking table before starting the server
await createRankingTable();

// // Test db connection
// app.get("/", async (req, res) => {
//   const result = await pool.query("SELECT current_database()");
//   res.send(`The database name is: ${result.rows[0]?.current_database}`);
// });

// Server running
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
