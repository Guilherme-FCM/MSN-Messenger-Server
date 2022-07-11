import { Server } from 'socket.io'
import httpServer from './http'
import { users, User } from './database/connection'

const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
})

io.on('connection', socket => {
    socket.on('login', data => {
        socket.join('contact-list')
        const user: User = {
            socket_id: socket.id,
            username: data.username
        }

        const userRoom = users.find(user => user.username === data.username)
        if (userRoom) userRoom.socket_id = socket.id
        else users.push(user)

        io.to('contact-list').emit('login', users)
    })

    socket.on('logoff', data => {
        const user = users.find(user => user.username === data.username)        
        if (user) users.splice(users.indexOf(user), 1)

        io.to('contact-list').emit('logoff', users)
    })

    socket.on('message', data => {
        const { sender, recipient, message } = data
        io.to(recipient).emit('message', { sender, message })
    })
})