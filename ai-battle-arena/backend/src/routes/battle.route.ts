import { Router } from "express";
import {
  createBattle,
  getAllBattles,
  getBattleById,
} from "../controllers/battle.controller.js";
import {
  validate,
  createBattleSchema,
} from "../middleware/validation.middleware.js";

const battleRouter = Router();

// POST /api/battles - Start a new battle
battleRouter.post("/", validate(createBattleSchema), createBattle);

// GET /api/battles - Get all battles (with pagination & search)
battleRouter.get("/", getAllBattles);

// GET /api/battles/:id - Get a single battle details
battleRouter.get("/:id", getBattleById);

export default battleRouter;