import mongoose from 'mongoose';
import Workout from '../models/workout.js';
import WeightEntry from '../models/weight-entry.js';

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

export async function getDurationAnalytics(userId) {
  const result = await Workout.aggregate([
    { $match: { user: mongoose.Types.ObjectId.createFromHexString(userId) } },
    {
      $group: {
        _id: { $isoWeek: '$date' },
        totalDuration: { $sum: '$duration' },
        workoutCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        label: { $concat: ['Week ', { $toString: '$_id' }] },
        value: {
          $cond: [
            { $eq: ['$workoutCount', 0] },
            0,
            {
              $trunc: [
                {
                  $divide: [{ $divide: ['$totalDuration', '$workoutCount'] }, 60000],
                },
                2,
              ],
            },
          ],
        },
        _id: 0,
      },
    },
  ]);

  return result;
}

export async function getFrequencyAnalytics(userId) {
  const result = await Workout.aggregate([
    { $match: { user: mongoose.Types.ObjectId.createFromHexString(userId) } },
    {
      $group: {
        _id: { $isoWeek: '$date' },
        value: { $sum: 1 },
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

export async function getWeightAnalytics(userId) {
  const result = await WeightEntry.find({ user: userId })
    .sort({ date: 1 })
    .select({ date: 1, weight: 1, _id: 0 });

  const formatted = result.map((entry) => ({
    date: entry.date.toISOString().split('T')[0],
    value: entry.weight,
  }));
  return formatted;
}
