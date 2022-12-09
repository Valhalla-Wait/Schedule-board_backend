import { connect } from '../index';
import { Request, Response } from 'express';

interface CreateQueryI{
  name: 'string'
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

interface CreateResponseI {
  fieldCount: number,
  affectedRows: number,
  insertId: number,
  info: string,
  serverStatus: number,
  warningStatus: number
}

interface ErrorResponseI {
  message: string,
  code: string,
  errno: number,
  sql: string,
  sqlState: string,
  sqlMessage: string
}

export class RoomsController {
  static async getRooms (req:Request, res:Response) {
    try {
      const [data] = await connect.query("SELECT * FROM rooms");
      res.json(data)
    } catch (e) {
      res.json({message: 'Server error'})
    }
    
  }

  static async createRoom (req:CustomCreateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`INSERT INTO rooms (name) VALUES ('${req.body.name}')`)
      res.json({
        message: `Кабинет добавлен`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }

  static async deleteRoom (req:CustomDeleteRequestI, res:Response) {
    try {
      const [data] = await connect.query(`DELETE FROM rooms WHERE id = ${req.body.id}`)
      res.json({
        message: `Кабинет удален`,
      })
    } catch (e) {
      res.json({message: 'Server error'})
    }
  }

  static async updateRoom (req:CustomUpdateRequestI, res:Response) {
    try {
      const [data] = await connect.query(`UPDATE rooms SET name = '${req.body.name}' WHERE id = ${req.body.id}`)
      res.json({
        message: `Кабинет изменен`,
      })
    } catch (e) {
      res.json({message: 'Server error', e})
    }
  }
}