import Workout, { WorkoutDocument } from '../models/workout';
import Exercise, { ExerciseDocument } from '../models/exercise';
import type { IAddWorkout, IUpdateWorkout } from '../types/workout-types';

export const getWorkoutDetail = async (id: string) => {
  return Workout.findById(id).populate('exercises.exercise');
};

export async function workoutList(userId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [workouts, total] = await Promise.all([
    Workout.find({ user: userId })
      .select('exercises date note totalCaloriesBurned duration')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit),
    Workout.countDocuments({ user: userId }),
  ]);

  const formattedWorkouts = workouts.map((workout) => ({
    id: workout._id,
    exerciseCount: workout.exercises.length,
    note: workout.note,
    date: workout.date,
    duration: workout.duration,
    totalCaloriesBurned: workout.totalCaloriesBurned,
  }));

  return {
    workouts: formattedWorkouts,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    totalWorkouts: total,
  };
}

export async function addWorkout({
  user,
  exercises,
  date,
  note,
  duration,
}: IAddWorkout): Promise<WorkoutDocument> {
  let totalCaloriesBurned = 0;
  if (Array.isArray(exercises)) {
    totalCaloriesBurned = exercises.reduce((sum, ex) => sum + (ex.caloriesBurned || 0), 0);
  }
  const workout = new Workout({
    user,
    exercises,
    date: date || undefined,
    totalCaloriesBurned,
    note,
    duration: duration || 0,
  });
  return await workout.save();
}

export async function getExercises(): Promise<ExerciseDocument[]> {
  return Exercise.find({});
}

export async function deleteWorkoutById(id: string, userId: string) {
  return await Workout.deleteOne({ _id: id, user: userId });
}

export async function updateWorkoutById(
  id: string,
  userId: string,
  { exercises, date, note, duration }: IUpdateWorkout,
): Promise<WorkoutDocument | null> {
  let totalCaloriesBurned = 0;
  if (Array.isArray(exercises)) {
    totalCaloriesBurned = exercises.reduce((sum, ex) => sum + (ex.caloriesBurned || 0), 0);
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id, user: userId },
    {
      exercises,
      date: date || undefined,
      note,
      totalCaloriesBurned,
      duration: duration || 0,
    },
    { new: true },
  ).populate('exercises.exercise');
  return workout;
}
