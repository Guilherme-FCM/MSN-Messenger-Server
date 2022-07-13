import express from 'express'
import userRoutes from './users'
import messageRoutes from './messages'

const routes = express.Router()
routes.use(express.json())
routes.use('/users', userRoutes)
routes.use('/messages', messageRoutes)

export default routes