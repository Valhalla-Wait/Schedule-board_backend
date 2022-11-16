import { connect } from '../index';
import type {Response, Request} from 'express'

interface CreateQueryI {
  name: string
}

interface DeleteQueryI{
  id: number
}

interface UpdateQueryI{
  id: number
  name: string
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

export class LessonsController {
  static async getLessons(req:Request, res:Response) {
    try {
      const [data] = await connect.query("SELECT * FROM `lessons`");
      res.json(data)
    } catch (e) {
      res.json({message: 'Server error'})
    }
    
  }

  static async createLesson (req:CustomCreateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`INSERT INTO lessons (name) VALUES ('${req.body.name}')`)
      res.json({
        message: `Урок добавлен`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }

  static async deleteLesson (req:CustomDeleteRequestI, res:Response) {
    try {
      const [data] = await connect.query(`DELETE FROM lessons WHERE id = ${req.body.id}`)
      res.json({
        message: `Урок удален`,
      })
    } catch (e) {
      res.json({message: 'Server error'})
    }
  }

  static async updateLesson (req:CustomUpdateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`UPDATE lessons SET name = '${req.body.name}' WHERE id = ${req.body.id}`)
      res.json({
        message: `Урок изменен`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }
}
