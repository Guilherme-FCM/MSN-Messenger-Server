import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "msn-messenger",
    synchronize: true,
    logging: false,
    entities: ['src/models/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
    subscribers: [],
})
