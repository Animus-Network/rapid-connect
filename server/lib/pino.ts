import pino, { HttpLogger } from 'pino-http';
import { loggerConfig } from '../config/logger';

const logger: HttpLogger = pino(loggerConfig);

export default logger;