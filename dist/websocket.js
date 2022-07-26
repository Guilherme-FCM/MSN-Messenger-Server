"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
io.on('connection', (socket) => {
    socket.on('login', data => {
        socket.join('contactList');
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
        io.to('contactList').emit('login', users);
    });
    socket.on('noteChange', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const user = users.find(user => user.username === data.username);
        const userService = new UserService_1.default();
        const result = yield userService.update(data);
        if (!(result instanceof Error)) {
            user.note = data.note;
            io.to('contactList').emit('noteChange', user);
        }
    }));
    socket.on('statusChange', data => {
        const user = users.find(user => user.username === data.username);
        user.status = data.status;
        io.to('contactList').emit('statusChange', user);
    });
    socket.on('logoff', data => {
        const user = users.find(user => user.username === data.username);
        if (user)
            users.splice(users.indexOf(user), 1);
        io.to('contactList').emit('logoff', users);
    });
    socket.on('openChat', data => {
        const senderUser = users.find(user => user.username === data.username);
        senderUser.socket_id = data.socketId;
    });
    socket.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        let { sender, recipient, text } = data;
        const messageService = new MessageService_1.default();
        const message = yield messageService.create({ sender, recipient, text });
        const recipientUser = users.find(user => user.username === recipient);
        if (recipientUser)
            io.in(recipientUser.socket_id).emit('message', message);
    }));
    socket.on("disconnect", reason => {
        const user = users.find(user => user.socket_id === socket.id);
        if (user)
            users.splice(users.indexOf(user), 1);
    });
});
