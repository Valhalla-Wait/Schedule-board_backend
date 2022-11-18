import { connect } from './../index';
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

interface RegistrationUserDataI {
  email: string
  password: string
  name: string
  surname: string
}

interface UserDataI {
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

      const userData = findUser as Array<UserDataI>

      if(!Array.isArray(findUser) || !userData.length) {
        return res.status(400).json({message: `Пользователь не найден`})
      }

      const isPassValid  = await bcrypt.compareSync(password, userData[0].password)

      if(!isPassValid) {
        return res.status(400).json({message: 'Неверный пароль'})
      }

      const token = jwt.sign({id: userData[0].id}, config.get('secretKey'), {expiresIn: '1h'}) 

      return res.json({
        token,
        user: {
          id: userData[0].id,
          email: userData[0].email,
          name: userData[0].name,
          surname: userData[0].surname,
        }
      })

    } catch (e) {
      res.send({message: 'Server error', e})
    }
  }
}