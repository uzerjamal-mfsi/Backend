import {
  getCaloriesAnalytics,
  getDurationAnalytics,
  getFrequencyAnalytics,
  getWeightAnalytics,
} from '../services/analytics-service';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/auth-types';

export async function getWeeklyCalories(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user.id;
    const analytics = await getCaloriesAnalytics(userId);
    res.status(201).json({ analytics });
  } catch (err) {
    next(err);
  }
}

export async function getWeeklyAverageWorkoutDuration(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user.id;
    const analytics = await getDurationAnalytics(userId);
    res.status(201).json({ analytics });
  } catch (err) {
    next(err);
  }
}

export async function getWeeklyFrequency(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user.id;
    const analytics = await getFrequencyAnalytics(userId);
    res.status(201).json({ analytics });
  } catch (err) {
    next(err);
  }
}

export async function getWeeklyWeightMeasurements(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user.id;
    const analytics = await getWeightAnalytics(userId);
    res.status(201).json({ analytics });
  } catch (err) {
    next(err);
  }
}
