import Goal from '../models/goal.js';
import WeightEntry from '../models/weight-entry.js';

export const addGoal = async ({ userId, type, target, endDate, note }) => {
  const goal = new Goal({
    user: userId,
    type,
    target,
    endDate: endDate || undefined,
    note,
  });
  await goal.save();
  return goal;
};

export const addWeightEntry = async ({ userId, weight, date }) => {
  const weightEntry = new WeightEntry({
    user: userId,
    weight,
    date: date || new Date(),
  });
  await weightEntry.save();
  return weightEntry;
};

export const goalsList = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [goals, total] = await Promise.all([
    Goal.find({ user: userId })
      .select('type target endDate note progress achieved achievedAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Goal.countDocuments({ user: userId }),
  ]);

  const formattedGoals = goals.map((goal) => ({
    id: goal._id,
    type: goal.type,
    target: goal.target,
    endDate: goal.endDate,
    note: goal.note,
    progress: goal.progress || 0,
    achieved: goal.achieved,
    achievedAt: goal.achievedAt,
  }));

  return {
    goals: formattedGoals,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    totalGoals: total,
  };
};
