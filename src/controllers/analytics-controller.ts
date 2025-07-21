import {
  getCaloriesAnalytics,
  getDurationAnalytics,
  getFrequencyAnalytics,
  getWeightAnalytics,
} from '../services/analytics-service';
import { Response, NextFunction } from 'express';

export async function getWeeklyCalories(req: any, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const analytics = await getCaloriesAnalytics(userId);
    res.status(201).json({ analytics });
  } catch (err) {
    next(err);
  }
}

export async function getWeeklyAverageWorkoutDuration(req: any, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const analytics = await getDurationAnalytics(userId);
    res.status(201).json({ analytics });
  } catch (err) {
    next(err);
  }
}

export async function getWeeklyFrequency(req: any, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const analytics = await getFrequencyAnalytics(userId);
    res.status(201).json({ analytics });
  } catch (err) {
    next(err);
  }
}

export async function getWeeklyWeightMeasurements(req: any, res: Response, next: NextFunction) {
  try {
    const userId = req.user.id;
    const analytics = await getWeightAnalytics(userId);
    res.status(201).json({ analytics });
  } catch (err) {
    next(err);
  }
}
