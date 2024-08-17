interface CreateRoom {
    hostUser: string,
    hostIp: string,
    hostUniqueId: string,
    needAuth: boolean,
    createdAt: number
}

interface Room {
    hostUser: string,
    hostIp: string,
    hostUniqueId: string,
    needAuth: boolean,
    createdAt: number
}

export { 
    CreateRoom
 };