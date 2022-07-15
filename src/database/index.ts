import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    entities: ['src/models/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
    subscribers: [],
    migrationsRun: true,
})