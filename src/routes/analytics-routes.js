import { Router } from 'express';
import authenticateToken from '../middleware/authenticate.js';
import { getWeeklyCalories } from '../controllers/analytics-controller.js';

export const analyticsRouter = Router();

analyticsRouter.get('/workout/calories', authenticateToken, getWeeklyCalories);
