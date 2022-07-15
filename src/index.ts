import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata'
import './websocket'
import httpServer from './http'

const port = process.env.PORT || 3333
httpServer.listen(port, () => { console.log('Server running on port ' + port) })