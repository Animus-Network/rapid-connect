import redisClient from "../../lib/redis";

class RedisService {
    private client: any;

    constructor() {
        this.client = redisClient;
        if (!this.client) {
            throw new Error('Redis client is not initialized.');
        }
    }

    async ping(): Promise<string> {
        try {
            const result = await this.client.ping();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async set(key: string, value: string | number, ttl: number | null = null): Promise<void> {
        try {
            let transaction = this.client.multi().set(key, value);
            if (ttl) {
                transaction = transaction.expire(key, ttl);
            }
            await transaction.exec();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async get(key: string): Promise<string | number | null> {
        let value: string | number | null = null;
        try {
            value = await this.client.get(key);
        } catch (error: any) {
            throw new Error(error);
        }
        return value;
    }

    async hset(key: string, value: any, ttl: number | null = null): Promise<void> {
        try {
            let transaction = this.client.multi().hset(key, value);
            if (ttl) {
                transaction = transaction.expire(key, ttl);
            }
            await transaction.exec();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async hgetall(key: string): Promise<{ [key: string]: string | number | null } | null> {
        let redisObj: { [key: string]: string } | null = {};

        try {
            redisObj = await this.client.hgetall(key);

            if (!redisObj) {
                redisObj = {};
            }

            if (!Object.keys(redisObj).length) {
                redisObj = null;
            }
        } catch (error: any) {
            throw new Error(error); // Or handle it based on its type, e.g., error.message
        }

        return redisObj;
    }
}

export default new RedisService();