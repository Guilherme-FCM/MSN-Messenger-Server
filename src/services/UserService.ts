import User from "../models/User";
import { AppDataSource } from "../database"

type UserRequest = { 
    username: number, 
    password: string, 
    firstName: string, 
    lastName: string, 
    email: string, 
    birthday: Date
}

AppDataSource.initialize()

export default class UserService {
    async index(){
        const repository = AppDataSource.getRepository(User)
        const users = await repository.find({
            select: {
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                birthday: true
            },
        })
        return users
    }
    async create(userBody: UserRequest){
        const repository = AppDataSource.getRepository(User)
        const user = repository.create(userBody)
        return await repository.save(user)
    }
}