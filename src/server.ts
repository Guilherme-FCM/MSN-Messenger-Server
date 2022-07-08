import express from "express";
import { Server } from 'socket.io'
import http from 'http'
import path from 'path'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

app.use(express.static(path.resolve(__dirname, '..', 'public')))
// app.use(express.urlencoded())
// app.use(express.json())

// app.post('/login', (request: Request, response: Response) => {
//     const { username } = request.body
//     return response.render(path.resolve(__dirname, '..', 'public', 'chat.html'), { username }, (error, html) => {
//         response.send(html)
//     })
//     // return response.sendFile(path.resolve(__dirname, '..', 'public', 'chat.html'))
// })

// Banco de Dados Fake
interface User {
    socket_id: string
    username: string
}
const users: User[] = [] 

io.on('connection', socket => {
    socket.on('login', data => {
        socket.join('contact-list')
        const user: User = {
            socket_id: socket.id,
            username: data.username
        }

        const userRoom = users.find(user => user.username === data.username)
        if (userRoom)
            userRoom.socket_id = socket.id
        else users.push(user)

        io.to('contact-list').emit('login', users)
    })

    socket.on('logoff', data => {
        const user = users.find(user => user.username === data.username)
        if (user) users.slice(users.indexOf(user), 1)

        io.to('contact-list').emit('logoff', users)
    })
})



httpServer.listen(3333)