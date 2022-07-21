"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const userRoutes = express_1.default.Router();
const userController = new UserController_1.default();
userRoutes.route('/')
    .get(userController.index)
    .post(userController.create);
userRoutes.get('/:username', userController.show);
userRoutes.post('/authenticate', userController.authenticate);
exports.default = userRoutes;
