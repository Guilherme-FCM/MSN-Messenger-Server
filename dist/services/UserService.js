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
const User_1 = __importDefault(require("../models/User"));
const database_1 = require("../database");
database_1.AppDataSource.initialize();
class UserService {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = database_1.AppDataSource.getRepository(User_1.default);
            return yield repository.find({
                select: {
                    username: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    note: true
                },
            });
        });
    }
    show(username, returnPassword = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = database_1.AppDataSource.getRepository(User_1.default);
            const user = yield repository.findOneBy({ username });
            if (!user)
                return Error("User not found.");
            if (!returnPassword)
                delete user.password;
            return user;
        });
    }
    create(userBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = database_1.AppDataSource.getRepository(User_1.default);
                if (yield repository.findOneBy({ username: userBody.username }))
                    return Error("User alredy exists.");
                const user = repository.create(userBody);
                return yield repository.save(user);
            }
            catch (error) {
                return Error(error);
            }
        });
    }
    update(userBody) {
        return __awaiter(this, void 0, void 0, function* () {
            let { username, firstName, lastName, email, note } = userBody;
            try {
                const repository = database_1.AppDataSource.getRepository(User_1.default);
                if (!(yield repository.findOneBy({ username })))
                    return Error("User not found.");
                return yield repository.update({ username }, { firstName, lastName, email, note });
            }
            catch (error) {
                return Error(error);
            }
        });
    }
}
exports.default = UserService;
