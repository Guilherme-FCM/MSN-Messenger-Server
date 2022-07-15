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
        const result = await service.show(username)

        if (result instanceof Error)
            return response.status(400).json({ error: result.message })
        return response.json(result)  
    }

    async create(request: Request, response: Response){
        let { username, password, firstName, lastName, email } = request.body

        const service = new UserService()
        const result = await service.create({ username, password, firstName, lastName, email })

        if(result instanceof Error)
            return response.status(400).json({ error: result.message })
        return response.json(result)
    }

    async authenticate(request: Request, response: Response){
        let { username, password } = request.body

        const service = new UserService()
        const result = await service.show(username, true)

        if (result instanceof Error)
            return response.status(400).json({ error: result.message })
        
        if(result.password !== password)
            return response.json({ error: 'Invalid password.' })
        return response.json(result)
    }
}