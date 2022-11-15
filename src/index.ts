import mysql from 'mysql2/promise';
import express from "express"
// import config from 'config'
import {scheduleRouter} from './routes/schedule.router'
import { roomsRouter } from './routes/rooms.router';

const PORT = 8000
const app = express()
app.use(express.json())
// app.use('/schedule', scheduleRouter)
app.use('/rooms', roomsRouter)

export const connect = mysql.createPool({
  host: "localhost",
  user: "mysql",
  database: "schedule_board",
  password: ""
});

// app.get("/tech", async (req, res) => {
//   const [data] = await connect.query("SELECT * FROM teachers");
//   res.json(data)
// });

app.listen(PORT, () => {
  console.log(`Server start on ${PORT}`)
})
