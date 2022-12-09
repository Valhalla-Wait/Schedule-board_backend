import mysql from 'mysql2/promise';
import express from "express"
import config from 'config'
import {scheduleRouter} from './Schedule/schedule.router'
import { roomsRouter } from './Rooms/rooms.router';
import { groupsRouter } from './Groups/groups.router';
import { lessonsRouter } from './Lessons/lessons.router';
import { teachersRouter } from './Teachers/teachers.router';
import { scheduledLessonsRouter } from './Scheduled_lessons/sheduled_lessons.router';
import { authRouter } from './Auth/auth.router';
import { corsMiddleware } from './middleware/cors.middleware';

const PORT = config.get('PORT')
const app = express()
app.use(express.json())
app.use(corsMiddleware)
app.use('/api/schedule', scheduleRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/groups', groupsRouter)
app.use('/api/lessons', lessonsRouter)
app.use('/api/teachers', teachersRouter)
app.use('/api/scheduled-lessons', scheduledLessonsRouter)
app.use('/api/auth', authRouter)

export const connect = mysql.createPool({
  host: "localhost",
  user: "mysql",
  database: "schedule_board",
  password: ""
});

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`)
})
