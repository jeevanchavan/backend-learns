import type { Request, Response, NextFunction } from "express";
import { Battle } from "../models/battle.model.js";
import runGraph from "../graph/battle.graph.js";

/**
 * Create a new battle
 * POST /api/battles
 */
export const createBattle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { prompt } = req.body;

    console.log(`Starting battle for prompt: "${prompt}"`);

    // Invoke LangGraph workflow
    const graphResult = await runGraph(prompt);

    const { solution_1, solution_2, judge } = graphResult;
    const { solution_1_score, solution_2_score } = judge;

    // Determine the winner automatically
    let winner = "Tie";
    if (solution_1_score > solution_2_score) {
      winner = "Mistral AI";
    } else if (solution_2_score > solution_1_score) {
      winner = "Cohere AI";
    }

    // Save the battle to MongoDB
    const battle = new Battle({
      prompt,
      solution_1,
      solution_2,
      judge,
      winner,
    });

    await battle.save();

    res.status(201).json({
      success: true,
      message: "Battle created successfully",
      data: battle,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all battles with pagination and search
 * GET /api/battles
 */
export const getAllBattles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search ? String(req.query.search).trim() : "";

    const skip = (page - 1) * limit;

    // Filter using case-insensitive search on prompt
    const filter: any = {};
    if (search) {
      filter.prompt = { $regex: search, $options: "i" };
    }

    const total = await Battle.countDocuments(filter);
    const battles = await Battle.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: battles,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single battle details
 * GET /api/battles/:id
 */
export const getBattleById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const battle = await Battle.findById(id);

    if (!battle) {
      res.status(404).json({
        success: false,
        message: "Battle not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: battle,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get dynamic leaderboard from battle history
 * GET /api/leaderboard
 */
export const getLeaderboard = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Dynamically calculate statistics using aggregation
    const stats = await Battle.aggregate([
      {
        $facet: {
          mistral: [
            {
              $group: {
                _id: null,
                wins: { $sum: { $cond: [{ $eq: ["$winner", "Mistral AI"] }, 1, 0] } },
                losses: { $sum: { $cond: [{ $eq: ["$winner", "Cohere AI"] }, 1, 0] } },
                avgScore: { $avg: "$judge.solution_1_score" },
              },
            },
          ],
          cohere: [
            {
              $group: {
                _id: null,
                wins: { $sum: { $cond: [{ $eq: ["$winner", "Cohere AI"] }, 1, 0] } },
                losses: { $sum: { $cond: [{ $eq: ["$winner", "Mistral AI"] }, 1, 0] } },
                avgScore: { $avg: "$judge.solution_2_score" },
              },
            },
          ],
        },
      },
    ]);

    const mistralStats = stats[0]?.mistral?.[0] || { wins: 0, losses: 0, avgScore: 0 };
    const cohereStats = stats[0]?.cohere?.[0] || { wins: 0, losses: 0, avgScore: 0 };

    const leaderboard = [
      {
        model: "Mistral AI",
        wins: mistralStats.wins,
        losses: mistralStats.losses,
        avgScore: Math.round((mistralStats.avgScore || 0) * 10) / 10,
      },
      {
        model: "Cohere AI",
        wins: cohereStats.wins,
        losses: cohereStats.losses,
        avgScore: Math.round((cohereStats.avgScore || 0) * 10) / 10,
      },
    ];

    // Sort by wins desc, then average score desc
    leaderboard.sort((a, b) => b.wins - a.wins || b.avgScore - a.avgScore);

    // Format response to include rank
    const rankedLeaderboard = leaderboard.map((row, index) => ({
      rank: index + 1,
      model: row.model,
      wins: row.wins,
      losses: row.losses,
      avgScore: row.avgScore,
    }));

    res.status(200).json({
      success: true,
      data: rankedLeaderboard,
    });
  } catch (error) {
    next(error);
  }
};