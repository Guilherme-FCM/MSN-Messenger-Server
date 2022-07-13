import { Entity, Column, PrimaryColumn } from "typeorm"

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
    birthday: Date
}
