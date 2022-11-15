import { connect } from './../index';
import { Request, Response } from 'express';
import { QueryError, RowDataPacket } from 'mysql2';

// export const getRooms = async (req:Request, res:Response) => {
//     const [data] = await connect.query("SELECT * FROM teachers")
//     res.send('hello')
// }

interface QueryRequestI{
  title: 'string'
  number: number
}

interface CustomRequest extends Request{
  body: QueryRequestI
}

export class RoomsController {
  static async getRooms (req:Request, res:Response) {
    const [data] = await connect.query("SELECT * FROM teachers");
    res.json(data)
  }

  static async createRoom (req:CustomRequest, res:Response) {
    const [data] = await connect.query(`INSERT INTO rooms(title, number) VALUES ('${req.body.title}', ${req.body.number})`)
    res.json({message: "Комната создана"})
  }

  // static async deleteRoom (req:Request, res:Response) {
  //   connect.query("SELECT * FROM schedule_list", (err:QueryError, response:RowDataPacket) => {
  //     if(err) res.json({message: `query error: ${err}`})
  //     res.send(json(data))
  //   })
  // }

  // static async updateRoom (req:Request, res:Response) {
  //   connect.query("SELECT * FROM schedule_list", (err:QueryError, response:RowDataPacket) => {
  //     if(err) res.json({message: `query error: ${err}`})
  //     res.send(json(data))
  //   })
  // }
}