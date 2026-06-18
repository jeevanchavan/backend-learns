import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error caught by global handler:", err);

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: err.errors[0]?.message || "Validation Error",
      errors: err.errors.map((e) => ({
        path: e.path.filter((p) => p !== "body").join("."),
        message: e.message,
      })),
    });
    return;
  }

  // Handle Mongoose CastError (e.g. invalid MongoDB ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: "Invalid Battle ID format",
    });
    return;
  }

  // Handle AI provider failures (errors from Mistral, Cohere, or Gemini)
  if (
    err.message?.includes("AI") ||
    err.message?.includes("provider") ||
    err.message?.includes("LangChain") ||
    err.message?.includes("model") ||
    err.message?.includes("invoke")
  ) {
    res.status(502).json({
      success: false,
      message: `AI Provider Failure: ${err.message}`,
    });
    return;
  }

  // Handle database connection or operational issues
  if (err.name === "MongoServerError" || err instanceof mongoose.Error) {
    res.status(500).json({
      success: false,
      message: "Database Operation Failed",
    });
    return;
  }

  // Fallback: internal server errors
  res.status(500).json({
    success: false,
    message: err.message || "An unexpected server error occurred",
  });
};
