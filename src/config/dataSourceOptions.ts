import { database_url, env } from "./enviroment";
import { DataSourceOptions } from "typeorm";

const extention = env == 'development' ? '.ts' : '.js'

const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    url: database_url,
    logging: false,
    entities: ['src/models/*' + extention],
    migrations: ['src/database/migrations/*' + extention],
    subscribers: [],
    migrationsRun: true
}

export default dataSourceOptions