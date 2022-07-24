import User from "../models/User";
import { AppDataSource } from "../database"
import { UpdateResult } from "typeorm";

AppDataSource.initialize()

type UserRequest = { 
    username: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    email: string,
    note?: string
}

export default class UserService {
    async index(){
        const repository = AppDataSource.getRepository(User)
        return await repository.find({
            select: {
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                note: true
            },
        })
    }

    async show(username: string, returnPassword: boolean = false): Promise<User | Error>{
        const repository = AppDataSource.getRepository(User)
        const user = await repository.findOneBy({ username })

        if (! user) return Error("User not found.")
        if (! returnPassword) delete user.password
        return user
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

    async update(userBody: UserRequest): Promise<UpdateResult | Error>{
        let { username, firstName, lastName, email, note } = userBody

        try {
            const repository = AppDataSource.getRepository(User)
            const user = await repository.findOneBy({ username })

            if (! user) return Error("User not found.")            
            return await repository.update({ username }, { firstName, lastName, email, note })
        } catch (error ) { return Error(error) }
    }
}