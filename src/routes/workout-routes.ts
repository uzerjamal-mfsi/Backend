import {
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
  createWorkout,
  getAllExercises,
} from '../controllers/workout-controller';
import express, { RequestHandler } from 'express';
import authenticateToken from '../middleware/authenticate';
import validate from '../middleware/validator';
import { workoutSchema } from '../validators/workout-validator';
import { getWorkouts } from '../controllers/workout-controller';
import { idParamSchema, paginationSchema } from '../validators/common-validator';

export const workoutRouter = express.Router();

workoutRouter.get('/exercises', authenticateToken, getAllExercises as RequestHandler);
workoutRouter.post(
  '/',
  authenticateToken,
  validate(workoutSchema),
  createWorkout as RequestHandler,
);
workoutRouter.get(
  '/',
  authenticateToken,
  validate(paginationSchema, 'query'),
  getWorkouts as RequestHandler,
);
workoutRouter.get(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  getWorkoutById as RequestHandler,
);
workoutRouter.put(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  validate(workoutSchema),
  updateWorkout as RequestHandler,
);
workoutRouter.delete(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  deleteWorkout as RequestHandler,
);
