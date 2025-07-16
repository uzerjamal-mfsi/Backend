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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Goal', goalSchema);
