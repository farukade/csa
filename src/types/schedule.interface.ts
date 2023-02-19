export interface ISchedule {
  name: string;
  start_hour: number;
  start_munite: number
  end_hour: number;
  end_munite: number;
  date: Date;
  description?: string;
}