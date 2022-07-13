import 'reflect-metadata'
import './websocket'
import httpServer from './http'

httpServer.listen(3333, () => { console.log('Server running on port 3333') })