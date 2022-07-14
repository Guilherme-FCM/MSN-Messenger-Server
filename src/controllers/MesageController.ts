import { Request, Response } from "express";
import MessageService from "../services/MessageService";

export default class MessageController {
    async index(request: Request, response: Response){
        let { sender, recipient } = request.query
        
        const service = new MessageService()
        const messages = await service.index(sender, recipient)
        return response.json(messages)
    }

    async create(request: Request, response: Response){
        let { sender, recipient, text } = request.body

        const service = new MessageService()
        const result = await service.create({ sender, recipient, text })

        if(result instanceof Error)
            return response.status(400).json({ error: result.message })
        return response.json(result)
    }
}