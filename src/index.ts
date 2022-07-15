import { port } from './config/enviroment'
import 'reflect-metadata'
import './websocket'
import httpServer from './http'

httpServer.listen(port, () => { console.log('Server running on port ' + port) })