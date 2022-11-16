import { Request, Response } from "express";
import { validationResult } from "express-validator";

export class AuthController {
  static async registration (req:Request,res:Response) {
    try {
      const validErrors = validationResult(req)
      if(!validErrors.isEmpty()) res.status(400).json({message: 'Некорректные данные', validErrors})
    } catch (e) {
      res.send({message: 'Server error'})
    }
  }
}