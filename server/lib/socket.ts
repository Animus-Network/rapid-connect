import { Express } from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from '../src/interfaces/socket.interface';

class Socket {
    private io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

    constructor() {
        this.io = new Server(createServer());
    }

    __use__(app: Express) {
        this.io = new Server(createServer(app));
    }
}

export default new Socket;