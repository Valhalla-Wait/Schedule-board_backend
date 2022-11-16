import { connect } from './../index';
import type {Response, Request} from 'express'

interface CreateQueryI {
  scheduled_lesson_id: number
  date: any
}

interface DeleteQueryI{
  id: number
}

interface UpdateQueryI{
  id: number
  scheduled_lesson_id?: number
  date?: Date
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

export class ScheduleController {
  static async getSchedule(req:Request, res:Response) {
    try {
      const [data] = await connect.query("SELECT * FROM schedule");
      res.json(data)
    } catch (e) {
      res.json({message: 'Server error'})
    }
    
  }

  static async createSchedule (req:CustomCreateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`INSERT INTO schedule (scheduled_lesson_id, date) VALUES (${req.body.scheduled_lesson_id}, ${req.body.date})`)
      res.json({
        message: `Урок добавлен в расписание`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }

  static async deleteSchedule (req:CustomDeleteRequestI, res:Response) {
    try {
      const [data] = await connect.query(`DELETE FROM schedule WHERE id = ${req.body.id}`)
      res.json({
        message: `Урок удален из расписания`,
      })
    } catch (e) {
      res.json({message: 'Server error'})
    }
  }

  static async updateSchedule (req:CustomUpdateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`UPDATE schedule SET scheduled_lesson_id = ${req.body.scheduled_lesson_id} WHERE id = ${req.body.id}`)
      res.json({
        message: `Урок в расписании изменен`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }
}
