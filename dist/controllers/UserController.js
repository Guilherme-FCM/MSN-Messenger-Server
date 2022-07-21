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
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new UserService_1.default();
            const users = yield service.index();
            return response.json(users);
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username } = request.params;
            const service = new UserService_1.default();
            const result = yield service.show(username);
            if (result instanceof Error)
                return response.status(400).json({ error: result.message });
            return response.json(result);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password, firstName, lastName, email } = request.body;
            const service = new UserService_1.default();
            const result = yield service.create({ username, password, firstName, lastName, email });
            if (result instanceof Error)
                return response.status(400).json({ error: result.message });
            return response.json(result);
        });
    }
    authenticate(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, password } = request.body;
            const service = new UserService_1.default();
            const result = yield service.show(username, true);
            if (result instanceof Error)
                return response.status(400).json({ error: result.message });
            if (result.password !== password)
                return response.json({ error: 'Invalid password.' });
            return response.json(result);
        });
    }
}
exports.default = UserController;
