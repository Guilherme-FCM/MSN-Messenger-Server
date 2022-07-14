import express from 'express'
import UserController from '../controllers/UserController'

const userRoutes = express.Router()
const userController = new UserController()

userRoutes.route('/')
    .get(userController.index)
    .post(userController.create)
userRoutes.get('/:username', userController.show)
userRoutes.post('/authenticate', userController.authenticate)

export default userRoutes