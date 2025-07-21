import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    note: { type: String, trim: true },
    exercises: [
      {
        exercise: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Exercise',
          required: true,
        },
        sets: { type: Number },
        reps: { type: Number },
        weight: { type: Number },
        caloriesBurned: { type: Number },
      },
    ],
    totalCaloriesBurned: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Workout', workoutSchema);
