import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import type { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const createBattleSchema = z.object({
  body: z.object({
    prompt: z
      .string({
        required_error: "Prompt is required",
      })
      .trim()
      .min(3, "Prompt must be at least 3 characters long"),
  }),
});
