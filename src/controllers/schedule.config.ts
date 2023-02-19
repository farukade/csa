import { Request, Response } from 'express';
import { ScheduleConfig } from '../models/schedule-config.model';
import { Schedule } from '../models/schedule.model';
import { User } from '../models/user.model';
import { ISchedule } from '../types/schedule.interface';
import { constants } from './constants';
const { handleError, handleBadRequest, handleSuccess } = constants;

const ScheduleController = {
  get: async (req: Request, res: Response) => {
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
  create: async (req: Request, res: Response) => {
    try {
      const body: ISchedule = req.body;

      const { start_hour, end_hour, start_munite, end_munite }: ISchedule = body;
      if (start_hour > 23 || end_hour > 23) return handleBadRequest(res, 400, "hour can't be greater than 23");
      if (start_hour < 0 || end_hour < 0) return handleBadRequest(res, 400, "hour can't be less than 0");
      if (start_munite > 59 || end_hour > 59) return handleBadRequest(res, 400, "munite can't be greater than 59");
      if (start_munite < 0 || end_hour < 0) return handleBadRequest(res, 400, "munite can't be less than 59");

      const schedule = new Schedule(body);
      await schedule.save();
      if (schedule) return handleSuccess(res, schedule, "schedule created", 201, null);
      return handleBadRequest(res, 500, "unexpected error");
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default ScheduleController;