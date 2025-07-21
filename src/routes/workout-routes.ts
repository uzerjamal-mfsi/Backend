import {
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
  createWorkout,
  getAllExercises,
} from '../controllers/workout-controller';
import express from 'express';
import authenticateToken from '../middleware/authenticate';
import validate from '../middleware/validator';
import { workoutSchema } from '../validators/workout-validator.js';
import { getWorkouts } from '../controllers/workout-controller.js';
import { idParamSchema, paginationSchema } from '../validators/common-validator.js';

export const workoutRouter = express.Router();

workoutRouter.get('/exercises', authenticateToken, getAllExercises);
workoutRouter.post('/', authenticateToken, validate(workoutSchema), createWorkout);
workoutRouter.get('/', authenticateToken, validate(paginationSchema, 'query'), getWorkouts);
workoutRouter.get('/:id', authenticateToken, validate(idParamSchema, 'params'), getWorkoutById);
workoutRouter.put(
  '/:id',
  authenticateToken,
  validate(idParamSchema, 'params'),
  validate(workoutSchema),
  updateWorkout,
);
workoutRouter.delete('/:id', authenticateToken, validate(idParamSchema, 'params'), deleteWorkout);
