import { ScheduleController } from './../controllers/schedule';
import Router from 'express'
export const scheduleRouter = Router()

scheduleRouter.get('/get', ScheduleController.getSchedule)
scheduleRouter.post('/create', ScheduleController.createSchedule)
scheduleRouter.post('/update', ScheduleController.updateSchedule)
scheduleRouter.post('/delete', ScheduleController.deleteSchedule)