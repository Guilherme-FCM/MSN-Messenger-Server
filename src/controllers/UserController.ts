import { Request, Response } from "express";
import UserService from "../services/UserService";


export default class UserController {
    async index(request: Request, response: Response){
        const service = new UserService()
        const users = await service.index()
        return response.json(users)
    }
}