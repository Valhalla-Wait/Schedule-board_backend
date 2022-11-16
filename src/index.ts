import mysql from 'mysql2/promise';
import express from "express"
import config from 'config'
import {scheduleRouter} from './routes/schedule.router'
import { roomsRouter } from './routes/rooms.router';
import { groupsRouter } from './routes/groups.router';
import { lessonsRouter } from './routes/lessons.router';
import { teachersRouter } from './routes/teachers.router';
import { scheduledLessonsRouter } from './routes/sheduled_lessons.router';

const PORT = config.get('PORT')
const app = express()
app.use(express.json())
app.use('/api/schedule', scheduleRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/groups', groupsRouter)
app.use('/api/lessons', lessonsRouter)
app.use('/api/teachers', teachersRouter)
app.use('/api/scheduled-lessons', scheduledLessonsRouter)

export const connect = mysql.createPool({
  host: "localhost",
  user: "mysql",
  database: "schedule_board",
  password: ""
});

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`)
})
