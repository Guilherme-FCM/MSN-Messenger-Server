import Message from '../models/Message'
import User from '../models/User'
import { AppDataSource } from "../database"

AppDataSource.initialize()

type MessageRequest = {
    id?: string
    sender: User
    recipient: User
    text: string
    created_at?: Date
}

export default class MessageService {
    async index(){
        const repository = AppDataSource.getRepository(Message)
        const messages = await repository.find()
        return messages
    }

    async create(messageBody: MessageRequest){
        const repository = AppDataSource.getRepository(Message)
        const message = repository.create(messageBody)
        return await repository.save(message)
    }
}