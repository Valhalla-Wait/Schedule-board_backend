import express from 'express'
import { GroupsController } from '../controllers/groups';
export const groupsRouter = express.Router()

groupsRouter.get('/get', GroupsController.getGroups)
groupsRouter.post('/create', GroupsController.createGroup)
groupsRouter.post('/update', GroupsController.updateGroup)
groupsRouter.post('/delete', GroupsController.deleteGroup)