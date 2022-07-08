import express from "express";
import { Server } from 'socket.io'
import http from 'http'
import path from 'path'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.resolve(__dirname, '..', 'public')))

io.on('connection', socket => {
    console.log(`New connection: ${socket.id}`);
})

httpServer.listen(3333)