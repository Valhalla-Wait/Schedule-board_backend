import express from 'express'
import { ScheduledLessonsController } from '../controllers/scheduled_lessons';
export const scheduledLessonsRouter = express.Router()

scheduledLessonsRouter.get('/get', ScheduledLessonsController.getScheduledLessons)
scheduledLessonsRouter.post('/create', ScheduledLessonsController.createScheduledLesson)
scheduledLessonsRouter.post('/update', ScheduledLessonsController.updateScheduledLesson)
scheduledLessonsRouter.post('/delete', ScheduledLessonsController.deleteScheduledLesson)