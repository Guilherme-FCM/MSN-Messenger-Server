// Banco de Dados Fake
interface User {
    socket_id: string
    username: string
}
const users: User[] = [] 

export { users, User }