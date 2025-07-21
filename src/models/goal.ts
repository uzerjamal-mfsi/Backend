import mongoose, { Model } from 'mongoose';

export type GoalType = 'workout_per_week' | 'weight_target';

export interface IGoal {
  user: mongoose.Types.ObjectId;
  type: GoalType;
  target: number;
  endDate?: Date;
  note?: string;
  progress?: number;
  achieved?: boolean;
  achievedAt?: Date;
}

export interface GoalDocument extends IGoal, Document {}

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['workout_per_week', 'weight_target'],
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Date,
    },
    note: {
      type: String,
      trim: true,
    },
    progress: {
      type: Number,
      default: 0,
    },
    achieved: {
      type: Boolean,
      default: false,
    },
    achievedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Goal: Model<GoalDocument> = mongoose.model<GoalDocument>('Goal', goalSchema);

export default Goal;
