import { Request, Response } from 'express';
import { ScheduleConfig } from '../models/schedule-config.model';
import { Schedule } from '../models/schedule.model';
import { IScheduleConfig } from '../types/schedule-config.interface';
import { ISchedule } from '../types/schedule.interface';
import { constants } from './constants';
import { utils } from '../utils/utils';
const { handleError, handleBadRequest, handleSuccess } = constants;
const { validateWeekDaysArr } = utils;

const ScheduleController = {
  getConfig: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (id && id !== "") {
        const result = await ScheduleConfig.findById(id);
        if (result) return handleSuccess(res, result, "schedule found", 200, null);
        return handleBadRequest(res, 400, "schedule not found");
      } else {
        const result = await ScheduleConfig.find();
        if (result.length) return handleSuccess(res, result, "schedule found", 200, null);
        return handleBadRequest(res, 400, "schedule not found");
      };
    } catch (error) {
      handleError(res, error);
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;

      if (id && id !== "") {
        const result = await Schedule.findById(id);
        if (result) return handleSuccess(res, result, "schedule found", 200, null);
        return handleBadRequest(res, 400, "schedule not found");
      } else {
        const result = await Schedule.find();
        if (result.length) return handleSuccess(res, result, "schedule found", 200, null);
        return handleBadRequest(res, 400, "schedule not found");
      };
    } catch (error) {
      return handleError(res, error);
    }
  },
  create: async (req: Request | { body: ISchedule }, res: Response) => {
    const hasRes = req.hasOwnProperty('headers') ? true : false;
    try {
      const body: ISchedule = req.body;
      const { start_hour, end_hour, start_munite, end_munite }: ISchedule = body;
      if (start_hour > 23 || end_hour > 23)
        return hasRes ? handleBadRequest(res, 400, "hour can't be greater than 23") : false;
      if (start_hour < 0 || end_hour < 0)
        return hasRes ? handleBadRequest(res, 400, "hour can't be less than 0") : false;
      if (start_munite > 59 || end_munite > 59)
        return hasRes ? handleBadRequest(res, 400, "munite can't be greater than 59") : false;
      if (start_munite < 0 || end_munite < 0)
        return hasRes ? handleBadRequest(res, 400, "munite can't be less than 59") : false;
      const schedule = new Schedule(body);
      await schedule.save();
      if (schedule)
        return hasRes ? handleSuccess(res, schedule, "schedule created", 201, null) : true;
      return hasRes ? handleBadRequest(res, 500, "unexpected error") : false;
    } catch (error) {
      return hasRes ? handleError(res, error) : false;
    }
  },
  saveConfig: async (req: Request, res: Response) => {
    try {
      const body: IScheduleConfig = req.body;
      const { start, end, schedule_start_type, week_days_arr } = body;
      if (start > end) return handleBadRequest(res, 400, "start date can't be greater than end date");

      if (!['range', 'specified'].includes(schedule_start_type))
        return handleBadRequest(res, 400, "not a valid schedule start type");

      if (!validateWeekDaysArr(week_days_arr))
        return handleBadRequest(res, 400, "week days array not valid");

    } catch (error) {
      return handleError(res, error);
    }
  }
}

export default ScheduleController;