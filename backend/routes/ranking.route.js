import express from "express";
import {
  calculateResult,
  fetchRandomPair,
  getLeaderboard,
} from "../controllers/ranking.controller.js";

const router = express.Router();

router.get("/get-pair", fetchRandomPair);

router.post("/rate-players", calculateResult);

router.get("/leaderboard", getLeaderboard);

export default router;
