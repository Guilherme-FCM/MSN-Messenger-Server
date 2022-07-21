"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./users"));
const messages_1 = __importDefault(require("./messages"));
const routes = express_1.default.Router();
routes.use(express_1.default.json());
routes.use('/users', users_1.default);
routes.use('/messages', messages_1.default);
exports.default = routes;
