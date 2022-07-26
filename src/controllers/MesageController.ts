import { Request, Response } from "express";
import MessageService from "../services/MessageService";

export default class MessageController {
    async index(request: Request, response: Response){
        let { sender, recipient } = request.query

        if(!sender || !recipient)
            return response.status(400).json({ error: 'Sender and recipient are required.' })
        
        const service = new MessageService()
        const result = await service.index(sender, recipient)

        if(result instanceof Error)
            return response.status(400).json({ error: result.message })
        return response.json(result)
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