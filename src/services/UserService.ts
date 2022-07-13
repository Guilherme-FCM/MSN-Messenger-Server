import User from "../models/User";
import { AppDataSource } from "../database"

type UserRequest = { 
    username: string, 
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

    async create(userBody: UserRequest): Promise<User | Error>{
        try {
            const repository = AppDataSource.getRepository(User)
            
            if (await repository.findOneBy({ username: userBody.username }))
                return Error("User alredy exists.")
            
            const user = repository.create(userBody)
            return await repository.save(user)
        } catch (error ) { return Error(error) }
    }
}