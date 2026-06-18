import mongoose, { Document, Schema } from "mongoose";

export interface IBattle extends Document {
  prompt: string;
  solution_1: string;
  solution_2: string;
  judge: {
    solution_1_score: number;
    solution_2_score: number;
    solution_1_reasoning: string;
    solution_2_reasoning: string;
  };
  winner: string;
  createdAt: Date;
  updatedAt: Date;
}

const battleSchema = new Schema<IBattle>(
  {
    prompt: {
      type: String,
      required: true,
      index: true,
    },
    solution_1: {
      type: String,
      required: true,
    },
    solution_2: {
      type: String,
      required: true,
    },
    judge: {
      solution_1_score: {
        type: Number,
        required: true,
      },
      solution_2_score: {
        type: Number,
        required: true,
      },
      solution_1_reasoning: {
        type: String,
        required: true,
      },
      solution_2_reasoning: {
        type: String,
        required: true,
      },
    },
    winner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Battle = mongoose.model<IBattle>("Battle", battleSchema);
