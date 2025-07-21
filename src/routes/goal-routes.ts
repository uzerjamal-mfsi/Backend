import express, { RequestHandler } from 'express';
import authenticateToken from '../middleware/authenticate';
import validate from '../middleware/validator';
import { goalSchema, weightEntrySchema } from '../validators/goal-validator';
import { createGoal, createWeightEntry, getGoalsList } from '../controllers/goal-controller';
import { paginationSchema } from '../validators/common-validator';

export const goalRouter = express.Router();

goalRouter.post('/', authenticateToken, validate(goalSchema), createGoal as RequestHandler);
goalRouter.get(
  '/',
  authenticateToken,
  validate(paginationSchema, 'query'),
  getGoalsList as RequestHandler,
);
goalRouter.post(
  '/weight',
  authenticateToken,
  validate(weightEntrySchema),
  createWeightEntry as RequestHandler,
);
