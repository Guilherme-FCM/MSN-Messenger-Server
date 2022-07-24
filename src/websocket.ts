import { Server } from 'socket.io'
import httpServer from './http'
import MessageService from './services/MessageService'

const io = new Server(httpServer, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"]
   }
})

interface OnlineUser {
   socket_id: string
   username: string
   firstName: string
   lastName: string
   status?: string
   note?: string
}
const users: OnlineUser[] = [] 

io.on('connection', socket => {
   socket.on('login', data => {
      socket.join('contact-list')
      let { username, firstName, lastName, status, note } = data
      
      const user: OnlineUser = {
         socket_id: socket.id,
         username, firstName, lastName, status, note
      }

      const userRoom = users.find(user => user.username === username)
      if (userRoom) userRoom.socket_id = socket.id
      else users.push(user)

      io.to('contact-list').emit('login', users)
   })

   socket.on('noteChange', data => {
      const user = users.find(user => user.username === data.username)
      user.note = data.note

      io.to('contact-list').emit('noteChange', user)
   })

   socket.on('statusChange', data => {
      const user = users.find(user => user.username === data.username)
      user.status = data.status

      io.to('contact-list').emit('statusChange', user) 
   })

   socket.on('logoff', data => {
      const user = users.find(user => user.username === data.username)        
      if (user) users.splice(users.indexOf(user), 1)

      io.to('contact-list').emit('logoff', users)
   })

   socket.on('message', data => {
      let { sender, recipient, text } = data

      const messageService = new MessageService()
      const message = messageService.create({ sender, recipient, text })

      io.to(recipient).emit('message', message)
   })
})