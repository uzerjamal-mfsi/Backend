import mongoose, { Model } from 'mongoose';

export interface IExercise {
  name: string;
  muscleGroup: string;
}

export interface ExerciseDocument extends IExercise, Document {}

const exerciseSchema = new mongoose.Schema<ExerciseDocument>({
  name: {
    type: String,
    required: true,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
});

const Exercise: Model<ExerciseDocument> = mongoose.model<ExerciseDocument>(
  'Exercise',
  exerciseSchema,
);

export default Exercise;
