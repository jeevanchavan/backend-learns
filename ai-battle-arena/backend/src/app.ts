import express from "express";
import battleRouter from "./routes/battle.route.js";
import leaderboardRouter from "./routes/leaderboard.route.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express();

// Middleware
app.use(express.json());

// CORS configuration middleware (allows React frontend to connect)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "All Good",
  });
});

// Routes
app.use("/api/battles", battleRouter);
app.use("/api/leaderboard", leaderboardRouter);

// Centralized error handling middleware (must be registered last)
app.use(errorHandler);

export default app;