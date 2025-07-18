import { getCaloriesAnalytics } from '../services/analytics-service.js';

export async function getWeeklyCalories(req, res, next) {
  try {
    const userId = req.user.id;
    const analytics = await getCaloriesAnalytics(userId);
    res.status(201).json({ analytics });
  } catch (err) {
    next(err);
  }
}
