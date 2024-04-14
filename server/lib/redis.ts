import { Config } from '../config/config';
import Redis, { RedisOptions } from 'ioredis';

const redisOptions: RedisOptions = {
    host: Config.REDIS_HOST, // Redis host
    port: Config.REDIS_PORT, // Redis port
    db: 0, // Defaults to 0
    // username: "default", // needs Redis >= 6
    // password: "my-top-secret",
};

export default new Redis(redisOptions);