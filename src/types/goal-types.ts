export interface IAddGoal {
  userId: string;
  type: string;
  target: number;
  endDate: string;
  note: string;
}

export interface IAddWeightEntry {
  userId: string;
  weight: number;
  date: string;
}
