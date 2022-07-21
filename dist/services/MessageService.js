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
const Message_1 = __importDefault(require("../models/Message"));
const database_1 = require("../database");
database_1.AppDataSource.initialize();
class MessageService {
    index(sender, recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = database_1.AppDataSource.getRepository(Message_1.default);
            return yield repository.find({
                where: [
                    { sender, recipient },
                    { sender: recipient, recipient: sender }
                ]
            });
        });
    }
    create(messageBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = database_1.AppDataSource.getRepository(Message_1.default);
                const message = repository.create(messageBody);
                return yield repository.save(message);
            }
            catch (error) {
                return Error(error.message);
            }
        });
    }
}
exports.default = MessageService;
