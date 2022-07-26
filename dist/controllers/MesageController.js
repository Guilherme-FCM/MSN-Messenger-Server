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
const MessageService_1 = __importDefault(require("../services/MessageService"));
class MessageController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { sender, recipient } = request.query;
            if (!sender || !recipient)
                return response.status(400).json({ error: 'Sender and recipient are required.' });
            const service = new MessageService_1.default();
            const result = yield service.index(sender, recipient);
            if (result instanceof Error)
                return response.status(400).json({ error: result.message });
            return response.json(result);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { sender, recipient, text } = request.body;
            if (!sender || !recipient || !text)
                return response.status(400).json({ error: 'Sender, recipient, and a text are required.' });
            const service = new MessageService_1.default();
            const result = yield service.create({ sender, recipient, text });
            if (result instanceof Error)
                return response.status(400).json({ error: result.message });
            return response.json(result);
        });
    }
}
exports.default = MessageController;
