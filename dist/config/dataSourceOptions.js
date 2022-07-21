"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enviroment_1 = require("./enviroment");
const root = enviroment_1.env == 'development' ? 'src' : 'dist';
const extention = enviroment_1.env == 'development' ? '.ts' : '.js';
const dataSourceOptions = {
    type: "postgres",
    url: enviroment_1.database_url,
    logging: false,
    entities: [root + '/models/*' + extention],
    migrations: [root + '/database/migrations/*' + extention],
    subscribers: [],
};
exports.default = dataSourceOptions;
