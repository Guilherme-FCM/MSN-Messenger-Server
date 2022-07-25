import { Server } from 'socket.io'
import httpServer from './http'
import MessageService from './services/MessageService'
import UserService from './services/UserService'

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

io.on('connection', (socket) => {
   socket.on('login', data => {
      socket.join('contactList')
      let { username, firstName, lastName, status, note } = data
      
      const user: OnlineUser = {
         socket_id: socket.id,
         username, firstName, lastName, status, note
      }

      const userRoom = users.find(user => user.username === username)
      if (userRoom) userRoom.socket_id = socket.id
      else users.push(user)

      io.to('contactList').emit('login', users)
   })

   socket.on('noteChange', async (data) => {
      const user = users.find(user => user.username === data.username)

      const userService = new UserService()
      const result = await userService.update(data)

      if (! (result instanceof Error)){
         user.note = data.note
         io.to('contactList').emit('noteChange', user)
      }
   })

   socket.on('statusChange', data => {
      const user = users.find(user => user.username === data.username)
      user.status = data.status

      io.to('contactList').emit('statusChange', user) 
   })

   socket.on('logoff', data => {
      const user = users.find(user => user.username === data.username)        
      if (user) users.splice(users.indexOf(user), 1)

      io.to('contactList').emit('logoff', users)
   })

   socket.on('openChat', data => {
      const senderUser = users.find(user => user.username === data.username)
      senderUser.socket_id = data.socketId
   })

   socket.on('message', async (data) => {
      let { sender, recipient, text } = data
      const recipientUser = users.find(user => user.username === recipient)
      
      const messageService = new MessageService()
      const message = await messageService.create({ sender, recipient, text })
      
      io.in(recipientUser.socket_id).emit('message', message)
   })
})