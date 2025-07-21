export interface IAddWorkout {
  user: string;
  exercises: any;
  date: Date;
  note: string;
  duration: number;
}

export interface IUpdateWorkout {
  exercises: any;
  date: string;
  note: string;
  duration: number;
}
