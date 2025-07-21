import {
  updateWorkoutById,
  deleteWorkoutById,
  getWorkoutDetail,
  addWorkout,
  getExercises,
  workoutList,
} from '../services/workout-service.js';
import createError from 'http-errors';
import { updateWorkoutGoals } from '../services/goal-events.js';
import { Response, NextFunction } from 'express';

export async function getWorkoutById(req: any, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const workout = await getWorkoutDetail(id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    if (!workout.user.equals(req.user.id)) {
      throw new createError.Forbidden('You do not have permission to access this workout');
    }
    res.json({ workout });
  } catch (err) {
    next(err);
  }
}

export async function getWorkouts(req: any, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const result = await workoutList(userId, Number(page), Number(limit));
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function createWorkout(req: any, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { exercises, date, note, duration } = req.body;
    const workout = await addWorkout({ user: userId, exercises, date, note, duration });
    const goal = await updateWorkoutGoals(userId);
    res.status(201).json({ workout, goal });
  } catch (err) {
    next(err);
  }
}

export async function getAllExercises(req: any, res: Response, next: NextFunction) {
  try {
    const exercises = await getExercises();
    res.json({ exercises });
  } catch (err) {
    next(err);
  }
}

export async function deleteWorkout(req: any, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const deleted = await deleteWorkoutById(id, userId);
    if (!deleted) return res.status(404).json({ error: 'Workout not found or not authorized' });
    res.json({ message: 'Workout deleted successfully' });
  } catch (err) {
    next(err);
  }
}

export async function updateWorkout(req: any, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { exercises, date, note, duration } = req.body;
    const updated = await updateWorkoutById(id, userId, { exercises, date, note, duration });
    if (!updated) return res.status(404).json({ error: 'Workout not found or not authorized' });
    res.json({ workout: updated });
  } catch (err) {
    next(err);
  }
}
