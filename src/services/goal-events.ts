import Goal from '../models/goal';
import Workout from '../models/workout';
import { startOfWeek, endOfWeek } from 'date-fns';

export async function updateWorkoutGoals(userId: string): Promise<{
  achieved: boolean;
  progress: number;
  target: number;
}> {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  let shortestGoal = Infinity;
  let goalAchieved = false;

  const workoutCount = await Workout.countDocuments({
    user: userId,
    date: { $gte: weekStart, $lte: weekEnd },
  });

  const goals = await Goal.find({
    user: userId,
    type: 'workout_per_week',
  });

  for (const goal of goals) {
    goal.progress = workoutCount;
    goalAchieved = workoutCount >= goal.target || goalAchieved;
    shortestGoal = Math.min(goal.target, shortestGoal);
  }
  await Goal.bulkSave(goals);
  return { achieved: goalAchieved, progress: workoutCount, target: shortestGoal };
}

export async function updateWeightGoals(userId: string, currentWeight: number): Promise<Boolean> {
  const now = new Date();
  let goalAchieved = false;

  const goals = await Goal.find({
    user: userId,
    type: 'weight_target',
    achieved: false,
  });

  for (const goal of goals) {
    const isAchieved = currentWeight <= goal.target;

    goal.progress = currentWeight;
    goal.achieved = isAchieved;
    goal.achievedAt = isAchieved ? now : undefined;
    goalAchieved = goalAchieved || isAchieved;
  }
  await Goal.bulkSave(goals);
  return goalAchieved;
}
