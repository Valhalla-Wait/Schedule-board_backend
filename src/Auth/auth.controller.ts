import { connect } from '../index';
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import { CustomAuthRequestI } from '../middleware/auth.middleware';

interface RegistrationUserDataI {
  email: string
  password: string
  name: string
  surname: string
}

export interface UserDataI {
  id: number
  email: string
  password: string
  name: string
  surname: string
}

interface LoginUserDataI {
  email: string
  password: string
}

interface RegistrationCustomRequest extends Request {
  body: RegistrationUserDataI
}

interface LoginCustomRequest extends Request {
  body: LoginUserDataI
}

export class AuthController {
  static async registration (req:RegistrationCustomRequest,res:Response) {
    try {
      const validErrors = validationResult(req)

      if(!validErrors.isEmpty()) res.status(400).json({message: 'Некорректные данные', validErrors})

      const {email, password, name, surname} = req.body

      const [findDuplicate] = await connect.query(`SELECT * FROM users WHERE email = '${email}'`)
      
      if(!Array.isArray(findDuplicate) || findDuplicate.length) {
        return res.status(400).json({message: `Пользователь ${email} уже существует`})
      }

      const hashPassword = await bcrypt.hash(password, 8)

      await connect.query(`INSERT INTO users (email, password, name, surname) VALUES ('${email}', '${hashPassword}', '${name}', '${surname}')`)

      return res.json({message: 'Пользователь добавлен'})

    } catch (e) {
      res.send({message: 'Server error', e})
    }
  }
  static async login (req:LoginCustomRequest,res:Response) {
    try {
      const validErrors = validationResult(req)

      if(!validErrors.isEmpty()) res.status(400).json({message: 'Некорректные данные', validErrors})

      const {email, password} = req.body

      const [findUser] = await connect.query(`SELECT * FROM users WHERE email = '${email}' LIMIT 1`)

      const user = findUser as Array<UserDataI>

      if(!Array.isArray(findUser) || !user.length) {
        return res.status(400).json(`Пользователь не найден`)
      }

      const isPassValid  = await bcrypt.compareSync(password, user[0].password)

      if(!isPassValid) {
        return res.status(400).json({message: 'Неверный пароль'})
      }

      const token = jwt.sign({id: user[0].id}, config.get('secretKey'), {expiresIn: '1h'}) 

      return res.json({
        token,
        user: {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          surname: user[0].surname,
        }
      })

    } catch (e) {
      res.send({message: 'Server error', e})
    }
  }
  static async auth (req:CustomAuthRequestI,res:Response) {
    try {
      const [findUser] = await connect.query(`SELECT * FROM users WHERE id = '${req.body.id}' LIMIT 1`)

      const user = findUser as Array<UserDataI>

      const token = jwt.sign({id: user[0].id}, config.get('secretKey'), {expiresIn: '1h'}) 

      return res.json({
        token,
        user: {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          surname: user[0].surname,
        }
      })
    } catch (e) {
      res.send({message: 'Server error', e})
    }
  }
}