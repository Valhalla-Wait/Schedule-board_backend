import { RoomsController } from '../controllers/rooms';
import express from 'express'
export const roomsRouter = express.Router()

roomsRouter.get('/get', RoomsController.getRooms)
roomsRouter.post('/create', RoomsController.createRoom)
// roomsRouter.post('/update', RoomsController.createRoom)
// roomsRouter.post('/delete', RoomsController.createRoom)