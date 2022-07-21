"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enviroment_1 = require("./config/enviroment");
require("reflect-metadata");
require("./websocket");
const http_1 = __importDefault(require("./http"));
http_1.default.listen(enviroment_1.port, () => { console.log('Server running on port ' + enviroment_1.port); });
