import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
    async index(request: Request, response: Response){
        const service = new UserService()
        const users = await service.index()
        return response.json(users)
    }

    async show(request: Request, response: Response){
        let { username } = request.params

        const service = new UserService()
        const user = await service.show(username)

        if (user instanceof Error)
            return response.json({ error: user.message })
        return response.json(user)  
    }

    async create(request: Request, response: Response){
        let { username, password, firstName, lastName, email, birthday } = request.body

        const service = new UserService()
        const user = await service.create({ username, password, firstName, lastName, email, birthday })

        if(user instanceof Error)
            return response.json({ error: user.message })
        return response.json(user)
    }

    async authenticate(request: Request, response: Response){
        let { username, password } = request.body

        const service = new UserService()
        const user = await service.show(username, true)

        if (user instanceof Error)
            return response.json({ error: user.message })
        
        if(user.password !== password)
            return response.json({ error: 'Invalid password.' })

        return response.json(user)
    }
}