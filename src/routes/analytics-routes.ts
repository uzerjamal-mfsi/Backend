import { Router } from 'express';
import authenticateToken from '../middleware/authenticate';
import {
  getWeeklyAverageWorkoutDuration,
  getWeeklyCalories,
  getWeeklyFrequency,
  getWeeklyWeightMeasurements,
} from '../controllers/analytics-controller';
import { RequestHandler } from 'express';

export const analyticsRouter = Router();

analyticsRouter.get('/workout/calories', authenticateToken, getWeeklyCalories as RequestHandler);
analyticsRouter.get(
  '/workout/duration',
  authenticateToken,
  getWeeklyAverageWorkoutDuration as RequestHandler,
);
analyticsRouter.get('/workout/frequency', authenticateToken, getWeeklyFrequency as RequestHandler);
analyticsRouter.get('/weight', authenticateToken, getWeeklyWeightMeasurements as RequestHandler);
