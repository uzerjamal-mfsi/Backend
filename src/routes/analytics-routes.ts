import { Router } from 'express';
import authenticateToken from '../middleware/authenticate';
import {
  getWeeklyAverageWorkoutDuration,
  getWeeklyCalories,
  getWeeklyFrequency,
  getWeeklyWeightMeasurements,
} from '../controllers/analytics-controller.js';

export const analyticsRouter = Router();

analyticsRouter.get('/workout/calories', authenticateToken, getWeeklyCalories);
analyticsRouter.get('/workout/duration', authenticateToken, getWeeklyAverageWorkoutDuration);
analyticsRouter.get('/workout/frequency', authenticateToken, getWeeklyFrequency);
analyticsRouter.get('/weight', authenticateToken, getWeeklyWeightMeasurements);
