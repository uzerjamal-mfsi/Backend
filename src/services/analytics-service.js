import mongoose from 'mongoose';
import Workout from '../models/workout.js';

export async function getCaloriesAnalytics(userId) {
  const result = await Workout.aggregate([
    { $match: { user: mongoose.Types.ObjectId.createFromHexString(userId) } },
    {
      $group: {
        _id: { $isoWeek: '$date' },
        value: { $sum: '$totalCaloriesBurned' },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        label: { $concat: ['Week ', { $toString: '$_id' }] },
        value: 1,
        _id: 0,
      },
    },
  ]);

  return result;
}
