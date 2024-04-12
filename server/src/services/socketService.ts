import { Express } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from '../interfaces/socket';

class SocketService {
    private io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData >;

    constructor(app: Express) {
        this.io = new Server(createServer(app));
    }
}


export { SocketService };