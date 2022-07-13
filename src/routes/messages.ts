import express from 'express'
import MessageController from '../controllers/MesageController'

const messageRoutes = express.Router()
const messageController = new MessageController()

messageRoutes.route('/')
    .get(messageController.index)
    .post(messageController.create)

export default messageRoutes