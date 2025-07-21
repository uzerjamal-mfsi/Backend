import mongoose, { Model } from 'mongoose';

export interface IWeightEntry {
  user: mongoose.Types.ObjectId;
  weight: number;
  date?: Date;
}

export interface WeightEntryDocument extends IWeightEntry, Document {}

const weightEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const WeightEntry: Model<WeightEntryDocument> = mongoose.model<WeightEntryDocument>(
  'WeightEntry',
  weightEntrySchema,
);

export default WeightEntry;
