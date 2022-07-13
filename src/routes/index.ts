import express from 'express'
import userRoutes from './users'

const routes = express.Router()
routes.use(express.json())
routes.use('/users', userRoutes)

export default routes