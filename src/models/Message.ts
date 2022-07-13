import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import User from "./User";

@Entity('messages')
export default class Message {
    constructor(){
        if (! this.id) this.id = uuid()
    }

    @PrimaryColumn()
    id: string

    @ManyToOne(() => User)
    sender: User

    @ManyToOne(() => User)
    recipient: User

    @Column()
    text: string

    @CreateDateColumn()
    created_at: Date
}