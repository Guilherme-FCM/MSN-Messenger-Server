import Message from '../models/Message'
import User from '../models/User'
import { AppDataSource } from "../database"

AppDataSource.initialize()

type MessageRequest = {
    id?: string
    sender: string
    recipient: string
    text: string
    created_at?: Date
}

export default class MessageService {
    async index(sender, recipient){
        const repository = AppDataSource.getRepository(Message)
        return await repository.find({
            where: [
                { sender, recipient },
                { sender: recipient, recipient: sender }
            ]
        })
    }

    async create(messageBody: MessageRequest){
        try {
            const repository = AppDataSource.getRepository(Message)
            const message = repository.create(messageBody)
            return await repository.save(message)
        } catch(error){ return Error(error.message) }
    }
}