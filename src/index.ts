import 'reflect-metadata'
import './websocket'
import httpServer from './http'
import { AppDataSource } from "./database"

AppDataSource.initialize()
    .then(() => {console.log('Database connected.')})
    .catch(error => {console.log('Houve um erro: ' + error)})
httpServer.listen(3333, () => { console.log('Server running on port 3333') })