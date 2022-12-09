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

export class GroupsController {
  static async getGroups(req:Request, res:Response) {
    try {
      const [data] = await connect.query("SELECT * FROM `groups`");
      res.json(data)
    } catch (e) {
      res.json({message: 'Server error', e})
    }
    
  }

  static async createGroup (req:CustomCreateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`INSERT INTO \`groups\` (name) VALUES ('${req.body.name}')`)
      res.json({
        message: `Группа добавлена`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }

  static async deleteGroup (req:CustomDeleteRequestI, res:Response) {
    try {
      const [data] = await connect.query(`DELETE FROM \`groups\` WHERE id = ${req.body.id}`)
      res.json({
        message: `Группа удалена`,
      })
    } catch (e) {
      res.json({message: 'Server error'})
    }
  }

  static async updateGroup (req:CustomUpdateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`UPDATE \`groups\` SET name = '${req.body.name}' WHERE id = ${req.body.id}`)
      res.json({
        message: `Группа изменена`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }
}
