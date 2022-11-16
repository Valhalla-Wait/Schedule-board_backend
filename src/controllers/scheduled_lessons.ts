import { connect } from '../index';
import type {Response, Request} from 'express'

interface CreateQueryI {
  time: any
  lesson_id: number
  teacher_id: number
  room_id: number
}

interface DeleteQueryI{
  id: number
}

interface UpdateQueryI{
  id: number
  time: any
  lesson_id: number
  teacher_id: number
  room_id: number
}

interface CustomCreateRequestI extends Request{
  body: CreateQueryI
}
interface CustomDeleteRequestI extends Request{
  body: DeleteQueryI
}

interface CustomUpdateRequestI extends Request{
  body: UpdateQueryI
}

export class ScheduledLessonsController {
  static async getScheduledLessons(req:Request, res:Response) {
    try {
      const [data] = await connect.query("SELECT * FROM scheduled_lessons");
      res.json(data)
    } catch (e) {
      res.json({message: 'Server error',e})
    }
    
  }

  static async createScheduledLesson (req:CustomCreateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`INSERT INTO scheduled_lessons (time, lesson_id, teacher_id, room_id) VALUES (${req.body.time}, ${req.body.lesson_id}, ${req.body.teacher_id}, ${req.body.room_id}, )`)
      res.json({
        message: `Урок запланирован`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }

  static async deleteScheduledLesson (req:CustomDeleteRequestI, res:Response) {
    try {
      const [data] = await connect.query(`DELETE FROM scheduled_lessons WHERE id = ${req.body.id}`)
      res.json({
        message: `Урок удален из планирования`,
      })
    } catch (e) {
      res.json({message: 'Server error'})
    }
  }

  static async updateScheduledLesson (req:CustomUpdateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`UPDATE scheduled_lessons SET time = ${req.body.time}, lesson_id = ${req.body.lesson_id}, teacher_id = ${req.body.teacher_id}, room_id = ${req.body.room_id} WHERE id = ${req.body.id}`)
      res.json({
        message: `Планироварование урока изменено`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }
}
