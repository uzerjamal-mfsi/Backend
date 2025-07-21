import Goal, { GoalDocument } from '../models/goal';
import WeightEntry, { WeightEntryDocument } from '../models/weight-entry';
import { IAddGoal, IAddWeightEntry } from '../types/goal-types';

export async function addGoal({
  userId,
  type,
  target,
  endDate,
  note,
}: IAddGoal): Promise<GoalDocument> {
  const goal = new Goal({
    user: userId,
    type,
    target,
    endDate: endDate || undefined,
    note,
  });
  await goal.save();
  return goal;
}

export async function addWeightEntry({
  userId,
  weight,
  date,
}: IAddWeightEntry): Promise<WeightEntryDocument> {
  const weightEntry = new WeightEntry({
    user: userId,
    weight,
    date: date || new Date(),
  });
  return await weightEntry.save();
}

export async function goalsList(userId: string, page = 1, limit = 10) {
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
}
