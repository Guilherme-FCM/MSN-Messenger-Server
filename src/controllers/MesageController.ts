import { Request, Response } from "express";
import MessageService from "../services/MessageService";

export default class MessageController {
    async index(request: Request, response: Response){
        const service = new MessageService()
        const messages = await service.index()
        return response.json(messages)
    }

    async create(request: Request, response: Response){
        let { id, sender, recipient, text } = request.body

        const service = new MessageService()
        const message = await service.create({ id, sender, recipient, text })

        return response.json(message)
    }
}