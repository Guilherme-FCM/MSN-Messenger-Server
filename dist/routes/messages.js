"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MesageController_1 = __importDefault(require("../controllers/MesageController"));
const messageRoutes = express_1.default.Router();
const messageController = new MesageController_1.default();
messageRoutes.route('/')
    .get(messageController.index)
    .post(messageController.create);
exports.default = messageRoutes;
