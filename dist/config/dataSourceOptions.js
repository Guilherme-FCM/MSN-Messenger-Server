"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enviroment_1 = require("./enviroment");
let dataSourceOptions;
if (enviroment_1.env === 'development')
    dataSourceOptions = {
        type: "postgres",
        url: enviroment_1.database_url,
        logging: false,
        entities: ['src/models/*.ts'],
        migrations: ['src/database/migrations/*.ts'],
        subscribers: [],
    };
else
    dataSourceOptions = {
        type: "postgres",
        url: enviroment_1.database_url,
        logging: false,
        entities: ['dist/models/*.js'],
        migrations: ['dist/database/migrations/*.js'],
        subscribers: [],
        ssl: {
            rejectUnauthorized: false
        }
    };
exports.default = dataSourceOptions;
