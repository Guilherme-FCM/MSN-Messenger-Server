import { database_url, env } from "./enviroment";
import { DataSourceOptions } from "typeorm";

const root = env == 'development' ? 'src' : 'dist'
const extention = env == 'development' ? '.ts' : '.js'

const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    url: database_url,
    logging: false,
    entities: [root + '/models/*' + extention],
    migrations: [root + '/database/migrations/*' + extention],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false
    }
}

export default dataSourceOptions