import mongoose, { Model } from 'mongoose';

export interface IWorkoutExercise {
  exercise: mongoose.Types.ObjectId;
  sets?: number;
  reps?: number;
  weight?: number;
  caloriesBurned?: number;
}

export interface IWorkout {
  date?: Date;
  user: mongoose.Types.ObjectId;
  note?: string;
  exercises: IWorkoutExercise[];
  totalCaloriesBurned?: number;
  duration?: number;
}

export interface WorkoutDocument extends IWorkout, Document {}

const workoutSchema = new mongoose.Schema<WorkoutDocument>(
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

const Workout: Model<WorkoutDocument> = mongoose.model<WorkoutDocument>('Workout', workoutSchema);
export default Workout;
