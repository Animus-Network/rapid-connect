import express, { Express } from 'express';
import { Config as config } from '../config/config';
import logger from '../lib/pino';
import { routerFactory } from './routes/base.route';
import { SocketService } from '../lib/socket';

const app: Express = express();
const socketService: SocketService = new SocketService(app);

app.use(logger);
app.use('/', routerFactory.getRouter());

// Start the server
app.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on port ${config.PORT}`);
});