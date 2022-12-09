import { RoomsController } from './rooms.controller';
import express from 'express'
export const roomsRouter = express.Router()

roomsRouter.get('/get', RoomsController.getRooms)
roomsRouter.post('/create', RoomsController.createRoom)
roomsRouter.post('/update', RoomsController.updateRoom)
roomsRouter.post('/delete', RoomsController.deleteRoom)