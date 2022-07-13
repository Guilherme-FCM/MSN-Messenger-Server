import { Request, Response } from "express";
import UserService from "../services/UserService";

export default class UserController {
    async index(request: Request, response: Response){
        const service = new UserService()
        const users = await service.index()
        return response.json(users)
    }

    async create(request: Request, response: Response){
        let { username, password, firstName, lastName, email, birthday } = request.body
        const service = new UserService()
        const user = await service.create({ username, password, firstName, lastName, email, birthday })
        return response.json(user)
    }
}