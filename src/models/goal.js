import mongoose from 'mongoose';

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

export default mongoose.model('Goal', goalSchema);
