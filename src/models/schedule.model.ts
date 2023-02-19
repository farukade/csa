import { Schema, model } from 'mongoose';
import { ISchedule } from '../types/schedule.interface';

const scheduleSchema = new Schema<ISchedule>({
  start_hour: { type: Number, required: true, min: 0, max: 23 },
  end_hour: { type: Number, required: true, min: 0, max: 23 },
  start_munite: { type: Number, required: true, min: 0, max: 59 },
  end_munite: { type: Number, required: true, min: 0, max: 59 },
  date: Date,
});

export const Schedule = model<ISchedule>('Schedule', scheduleSchema);