import express, { Express, Router } from 'express';
import pino, { HttpLogger } from 'pino-http';
import { Config as config } from '../config/config';
import { loggerConfig } from '../config/logger';

const logger: HttpLogger = pino(loggerConfig);
const app: Express = express();
const router: Router = express.Router();

app.use(logger);
app.use('/', router);

// Start the server
app.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on port ${config.PORT}`);
});