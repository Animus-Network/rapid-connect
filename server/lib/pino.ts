import pino, { BaseLogger } from 'pino';
import { loggerConfig } from '../config/logger';

const logger: BaseLogger = pino(loggerConfig);

export { logger, BaseLogger };