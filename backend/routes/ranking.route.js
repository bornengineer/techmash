import express from "express";
import {
  calculateResult,
  fetchRandomPair,
  getLeaderboard,
} from "../controllers/ranking.controller.js";

const router = express.Router();

router.get("/pair", fetchRandomPair);

router.post("/rate", calculateResult);

router.get("/leaderboard", getLeaderboard);

export default router;
