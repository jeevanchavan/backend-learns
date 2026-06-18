import { Router } from "express";
import { getLeaderboard } from "../controllers/battle.controller.js";

const leaderboardRouter = Router();

// GET /api/leaderboard - Dynamic leaderboard calculations
leaderboardRouter.get("/", getLeaderboard);

export default leaderboardRouter;
