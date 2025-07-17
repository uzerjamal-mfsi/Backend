import Workout from '../models/workout.js';
import Exercise from '../models/exercise.js';

export const getWorkoutDetail = async (id) => {
  return Workout.findById(id).populate('exercises.exercise');
};

export const workoutList = async (userId, page = 1, limit = 10) => {
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
};

export const addWorkout = async ({ user, exercises, date, note, duration }) => {
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
  await workout.save();
  return workout;
};

export const getExercises = async () => {
  return Exercise.find({});
};

export const deleteWorkoutById = async (id, userId) => {
  await Workout.deleteOne({ _id: id, user: userId });
  return true;
};

export const updateWorkoutById = async (id, userId, { exercises, date, note, duration }) => {
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
};
