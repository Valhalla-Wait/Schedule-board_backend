import express from 'express'
import { TeachersController } from './teachers.controller';
export const teachersRouter = express.Router()

teachersRouter.get('/get', TeachersController.getTeachers)
teachersRouter.post('/create', TeachersController.createTeacher)
teachersRouter.post('/update', TeachersController.updateTeacher)
teachersRouter.post('/delete', TeachersController.deleteTeacher)