import { connect } from '../index';
import type {Response, Request} from 'express'

interface CreateQueryI {
  name: string
  middle_name: string
  surname: string
}

interface DeleteQueryI{
  id: number
}

interface UpdateQueryI{
  id: number
  name: string
  middle_name: string
  surname: string
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

export class TeachersController {
  static async getTeachers(req:Request, res:Response) {
    try {
      const [data] = await connect.query("SELECT * FROM teachers");
      res.json(data)
    } catch (e) {
      res.json({message: 'Server error'})
    }
    
  }

  static async createTeacher (req:CustomCreateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`INSERT INTO teachers (name, middle_name, surname) VALUES ('${req.body.name}', '${req.body.middle_name}', '${req.body.surname}')`)
      res.json({
        message: `Преподаватель добавлен`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }

  static async deleteTeacher (req:CustomDeleteRequestI, res:Response) {
    try {
      const [data] = await connect.query(`DELETE FROM teachers WHERE id = ${req.body.id}`)
      res.json({
        message: `Преподаватель удален`,
      })
    } catch (e) {
      res.json({message: 'Server error'})
    }
  }

  static async updateTeacher (req:CustomUpdateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`UPDATE teachers SET name = '${req.body.name}', middle_name = '${req.body.middle_name}', surname = '${req.body.surname}' WHERE id = ${req.body.id}`)
      res.json({
        message: `Преподаватель изменен`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }
}
