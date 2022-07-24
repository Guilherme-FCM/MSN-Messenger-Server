import { database_url, env } from "./enviroment";
import { DataSourceOptions } from "typeorm";

let dataSourceOptions: DataSourceOptions
if (env === 'development')
    dataSourceOptions = {
        type: "postgres",
        url: database_url,
        logging: false,
        entities: ['src/models/*.ts'],
        migrations: ['src/database/migrations/*.ts'],
        subscribers: [],
    }
else 
    dataSourceOptions = {
        type: "postgres",
        url: database_url,
        logging: false,
        entities: ['dist/models/*.js'],
        migrations: ['dist/database/migrations/*.js'],
        subscribers: [],
        ssl: {
            rejectUnauthorized: false
        }
    }

export default dataSourceOptions