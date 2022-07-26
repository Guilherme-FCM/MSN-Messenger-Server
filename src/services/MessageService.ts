import Message from '../models/Message'
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
        try {
            const repository = AppDataSource.getRepository(Message)
            return await repository.find({
                where: [
                    { sender, recipient },
                    { sender: recipient, recipient: sender }
                ]
            })
        } catch(error){ return Error(error.message) }
    }

    async create(messageBody: MessageRequest){
        try {
            const repository = AppDataSource.getRepository(Message)
            const message = repository.create(messageBody)
            return await repository.save(message)
        } catch(error){ return Error(error.message) }
    }
}