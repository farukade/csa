export interface IScheduleConfig {
  start: Date;
  end: Date;
  week_arr: number[];
  week_exceptions: number[];
  schedule_start: Date[];
  schedule_start_type: string;
  duration: number;
  week_appearance: number;
  month_appearance: number;
}