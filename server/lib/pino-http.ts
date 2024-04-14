import pino, { HttpLogger } from 'pino-http';
import { logger as baseLogger } from './pino';
import { loggerConfig } from '../config/logger';

const httpLogger: HttpLogger = pino(loggerConfig);

export { httpLogger, baseLogger, HttpLogger };