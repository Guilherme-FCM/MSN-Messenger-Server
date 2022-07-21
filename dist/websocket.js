"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("./http"));
const MessageService_1 = __importDefault(require("./services/MessageService"));
const io = new socket_io_1.Server(http_1.default, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const users = [];
io.on('connection', socket => {
    socket.on('login', data => {
        socket.join('contact-list');
        let { username, firstName, lastName, status, message } = data;
        const user = {
            socket_id: socket.id,
            username, firstName, lastName, status, message
        };
        const userRoom = users.find(user => user.username === data.username);
        if (userRoom)
            userRoom.socket_id = socket.id;
        else
            users.push(user);
        io.to('contact-list').emit('login', users);
    });
    socket.on('logoff', data => {
        const user = users.find(user => user.username === data.username);
        if (user)
            users.splice(users.indexOf(user), 1);
        io.to('contact-list').emit('logoff', users);
    });
    socket.on('message', data => {
        const { sender, recipient, text } = data;
        const messageService = new MessageService_1.default();
        const message = messageService.create({ sender, recipient, text });
        io.to(recipient).emit('message', message);
    });
});
