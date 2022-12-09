import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import config from "config"
import { UserDataI } from "../Auth/auth.controller"

export interface CustomAuthRequestI extends Request{
  body: UserDataI
}

export const authMiddleware = (req:CustomAuthRequestI, res:Response, next:NextFunction) => {
  if(req.method === 'OPTIONS') next()

  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json('Auth error')
    }

    const decoded = jwt.verify(token, config.get('secretKey'))
    req.body = decoded as UserDataI
    next()
  } catch (e) {
    return res.status(401).json('Auth error')
  }
}