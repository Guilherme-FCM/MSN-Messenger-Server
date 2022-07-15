import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3333
const database_url = process.env.DATABASE_URL
const env = process.env.ENV


export { port, database_url, env }