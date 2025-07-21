import { updateWeightGoals } from '../services/goal-events.js';
import { addGoal, addWeightEntry, goalsList } from '../services/goal-service.js';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth-types.js';

export async function createGoal(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const { type, target, endDate, note } = req.body;
    const goal = await addGoal({
      userId,
      type,
      target,
      endDate,
      note,
    });
    res.status(201).json({ goal });
  } catch (err) {
    next(err);
  }
}

export async function getGoalsList(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;
    const goals = await goalsList(userId, Number(page), Number(limit));
    res.status(200).json({ goals });
  } catch (err) {
    next(err);
  }
}

export async function createWeightEntry(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user.id;
    const { weight, date } = req.body;
    const weightEntry = await addWeightEntry({
      userId,
      weight,
      date,
    });
    const goalAchieved = await updateWeightGoals(userId, weight);
    res.status(201).json({ weightEntry, goalAchieved });
  } catch (err) {
    next(err);
  }
}
