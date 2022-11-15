import { connect } from './../index';
import type {Response, Request} from 'express'
import { QueryError, RowDataPacket } from 'mysql2';

export class ScheduleController {
  static async getSchedule (req:Request, res:Response) {

    const [data] = await connect.query("SELECT * FROM teachers")
    res.json(data)
    
  }

  static async createSchedule (req:Request, res:Response) {
    connect.query("SELECT * FROM schedule_list", (err:QueryError, response:RowDataPacket) => {
      if(err) res.json({message: `query error: ${err}`})
      res.json(response)
    })
  }

  static async deleteSchedule (req:Request, res:Response) {
    connect.query("SELECT * FROM schedule_list", (err:QueryError, response:RowDataPacket) => {
      if(err) res.json({message: `query error: ${err}`})
      res.json(response)
    })
  }

  static async updateSchedule (req:Request, res:Response) {
    connect.query("SELECT * FROM schedule_list", (err:QueryError, response:RowDataPacket) => {
      if(err) res.json({message: `query error: ${err}`})
      res.json(response)
    })
  }
}
