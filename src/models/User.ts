import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import Message from "./Message"

@Entity('users')
export default class User {
    @PrimaryColumn()
    username: string

    @Column()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    note: string

    @OneToMany(() => Message, (message) => message.sender)
    messages: Message[]
}
