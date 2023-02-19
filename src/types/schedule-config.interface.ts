export interface IScheduleConfig {
  start: Date;
  end: Date;
  week_days_arr: number[];
  week_days_exceptions: number[];
  week_arr: number[];
  week_exceptions: number[];
  schedule_start: Date[];
  //specifies schedule start 
  // i.e range (for everything between two values) or
  // specified (for pre specified start times)
  schedule_start_type: string;
  duration: number;
  day_appearance: number;
  week_appearance: number;
  month_appearance: number;
  name: string;
}