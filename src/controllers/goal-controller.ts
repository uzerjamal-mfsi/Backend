import { updateWeightGoals } from '../services/goal-events.js';
import { addGoal, addWeightEntry, goalsList } from '../services/goal-service.js';
import { Request, Response, NextFunction } from 'express';

export const createGoal = async (req: any, res: Response, next: NextFunction) => {
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
};

export const getGoalsList = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;
    const goals = await goalsList(userId, page, limit);
    res.status(200).json({ goals });
  } catch (err) {
    next(err);
  }
};

export const createWeightEntry = async (req: any, res: Response, next: NextFunction) => {
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
};
