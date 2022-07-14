import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import User from "./User";

@Entity('messages')
export default class Message {
    constructor(){
        if (! this.id) this.id = uuid()
    }

    @PrimaryColumn()
    id: string

    @Column()
    sender: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'sender' })
    senderUser: User

    @Column()
    recipient: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'recipient' })
    recipientUser: User

    @Column()
    text: string

    @CreateDateColumn()
    created_at: Date
}