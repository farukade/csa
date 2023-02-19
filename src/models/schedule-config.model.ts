import { Schema, model } from 'mongoose';
import { IScheduleConfig } from '../types/schedule-config.interface';

const scheduleConfigSchema = new Schema<IScheduleConfig>({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  week_arr: [Number],
  week_exceptions: [Number],
  schedule_start: [Date],
  schedule_start_type: Date,
  duration: Number,
  week_appearance: Number,
  month_appearance: Number,
});

export const ScheduleConfig = model<IScheduleConfig>('ScheduleConfig', scheduleConfigSchema);