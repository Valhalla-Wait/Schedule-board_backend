import express from 'express'
import { LessonsController } from './lessons.controller';
export const lessonsRouter = express.Router()

lessonsRouter.get('/get', LessonsController.getLessons)
lessonsRouter.post('/create', LessonsController.createLesson)
lessonsRouter.post('/update', LessonsController.updateLesson)
lessonsRouter.post('/delete', LessonsController.deleteLesson)