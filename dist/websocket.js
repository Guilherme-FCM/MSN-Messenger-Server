"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("./http"));
const MessageService_1 = __importDefault(require("./services/MessageService"));
const UserService_1 = __importDefault(require("./services/UserService"));
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
        let { username, firstName, lastName, status, note } = data;
        const user = {
            socket_id: socket.id,
            username, firstName, lastName, status, note
        };
        const userRoom = users.find(user => user.username === username);
        if (userRoom)
            userRoom.socket_id = socket.id;
        else
            users.push(user);
        io.to('contact-list').emit('login', users);
    });
    socket.on('noteChange', data => {
        const user = users.find(user => user.username === data.username);
        const userService = new UserService_1.default();
        const result = userService.update(data);
        if (!(result instanceof Error)) {
            user.note = data.note;
            io.to('contact-list').emit('noteChange', user);
        }
    });
    socket.on('statusChange', data => {
        const user = users.find(user => user.username === data.username);
        user.status = data.status;
        io.to('contact-list').emit('statusChange', user);
    });
    socket.on('logoff', data => {
        const user = users.find(user => user.username === data.username);
        if (user)
            users.splice(users.indexOf(user), 1);
        io.to('contact-list').emit('logoff', users);
    });
    socket.on('message', data => {
        let { sender, recipient, text } = data;
        const messageService = new MessageService_1.default();
        const message = messageService.create({ sender, recipient, text });
        io.to(recipient).emit('message', message);
    });
});
