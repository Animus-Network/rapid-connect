import express, { Express } from 'express';
import pino, { HttpLogger } from 'pino-http';
import { Config as config } from '../config/config';
import { loggerConfig } from '../config/logger';
import { routerFactory } from './routes/routerFactory';

const logger: HttpLogger = pino(loggerConfig);
const app: Express = express();

app.use(logger);
app.use('/', routerFactory.getRouter());

// Start the server
app.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on port ${config.PORT}`);
});