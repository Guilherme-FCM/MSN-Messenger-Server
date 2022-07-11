import express from "express";
import http from 'http'
import path from 'path'

const app = express()
app.use(express.static(path.resolve(__dirname, '..', 'public')))

export default http.createServer(app)