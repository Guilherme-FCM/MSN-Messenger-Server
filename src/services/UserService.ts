import User from "../models/User";
import { AppDataSource } from "../database"

AppDataSource.initialize()

export default class UserService {
    async index(){
        const repository = AppDataSource.getRepository(User)
        const users = await repository.find()
        return users
    }
}