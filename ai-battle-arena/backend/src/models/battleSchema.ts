import mongoose, {Document,Schema} from 'mongoose';

export interface IBattle extends Document {
  prompt: string;
  model_1: string;
  model_2: string;
  solution_1: string;
  solution_2: string;
  judge: string;
  winner: string;
  createdAt: Date;
}

const battleSchema = new Schema<IBattle>({
  prompt: {
    type: String,
    required: true,
  },
  model_1: {
    type: String,
    required: true,
  },
  solution_1: {
    type: String,
    required: true,
  },
  model_2: {
    type: String,
    required: true,
  },
  solution_2: {
    type: String,
    required: true,
  },
  judge: {
    type: String,
    required: true,
  },
  winner: {
    type: String,
    required: true,
  },
});

export const Battle = mongoose.model<IBattle>('Battle', battleSchema);