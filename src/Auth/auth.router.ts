import express from 'express'
import { check } from 'express-validator'
import { AuthController } from './auth.controller'
import { authMiddleware } from '../middleware/auth.middleware'
export const authRouter = express.Router()

authRouter.post('/registration', 
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', "Пароль должен содержать не меньше 3 и не больше 12 символов").isLength({min:4, max: 12})
  ],
  AuthController.registration)
authRouter.post('/login', AuthController.login)
authRouter.get('/auth', authMiddleware, AuthController.auth)