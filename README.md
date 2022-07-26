<h1 align="center">📱 MSN-Messenger-Server</h1>
<p align="center">Node.js server for real time chat</p>

<p align="center">
    <a href="#about">About</a> |
    <a href="#installations">Installations</a> |
    <a href="#how-to-use">How to Use</a> | 
    <a href="#documentation">Documentation</a> | 
    <a href="#technologies">Technologies</a> | 
    <a href="#license">License</a>
</p>

## 😁**About**
This server is made to serve the [MSN-Messenger app](https://github.com/gabegodoy/msn-messenger) develop by [Gabriel Godoy](https://github.com/gabegodoy). This applications is capable to register users and messages in order implements a real time chat.

## 👨‍💻**Installations**
To use this API, it's require install in your computer:
- [Node & NPM](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

## 🚀**How to Use**
1. Copy the [.env.example](./.env.example) to a new file called `.env` and configure your database and application port

2. Create a database, for example:
~~~sql
create database "msn-messenger"
~~~

3. Execute the commands below in project directory to use this API in your computer:
~~~bash
# Install dependencies
npm install;

# Create database
npm run migrations;

# Run project in development mode
npm run dev;

# Runing in http://localhost:3333/
~~~

## ✨**Technologies**
- [Node.js](https://nodejs.org/en/docs/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/docs/)

## ⚖**License**
This project is under the license [MIT](./LICENSE).

### Made by [Guilherme Feitosa](https://github.com/Guilherme-FCM/).