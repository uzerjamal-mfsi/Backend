import express from 'express';
import authenticateToken from '../middleware/authenticate.js';
import validate from '../middleware/validator.js';
import { goalSchema, weightEntrySchema } from '../validators/goal-validator.js';
import { createGoal, createWeightEntry, getGoalsList } from '../controllers/goal-controller.js';
import { paginationSchema } from '../validators/common-validator.js';

export const goalRouter = express.Router();

goalRouter.post('/', authenticateToken, validate(goalSchema), createGoal);
goalRouter.get('/', authenticateToken, validate(paginationSchema, 'query'), getGoalsList);
goalRouter.post('/weight', authenticateToken, validate(weightEntrySchema), createWeightEntry);
