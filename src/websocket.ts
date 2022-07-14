import { Server } from 'socket.io'
import httpServer from './http'

const io = new Server(httpServer, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"]
   }
})