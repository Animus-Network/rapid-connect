import redisClient from "../../lib/redis";

const redisPing = async (): Promise<string> => {
    // Ensure redisClient is properly initialized before calling ping
    if (!redisClient) {
        throw new Error('Redis client is not initialized.');
    }

    try {
        const result = await redisClient.ping();
        return result;
    } catch (error: any) {
        throw new Error(error); // Or handle it based on its type, e.g., error.message
    }
};

// Function to set a key-value pair in Redis
const redisSet = async (key: string, value: string | number, ttl: number | null = null): Promise<void> => {
    // Ensure redisClient is properly initialized before calling set
    if (!redisClient) {
        throw new Error('Redis client is not initialized.');
    }

    try {
        let transaction = redisClient.multi().set(key, value);
        if (ttl) {
            transaction = transaction.expire(key, ttl);
        }
        await transaction.exec();
    } catch (error: any) {
        throw new Error(error);
    }
};


// Function to get a value from Redis
const redisGet = async (key: string): Promise<string | number | null> => {
    // Ensure redisClient is properly initialized before calling get
    if (!redisClient) {
        throw new Error('Redis client is not initialized.');
    }

    let value: string | number | null = null;

    try {
        value = await redisClient.get(key);
    } catch (error: any) {
        throw new Error(error); // Or handle it based on its type, e.g., error.message
    }

    return value;
};


// Function to set a key-value hash pair in Redis
const redisHset = async (key: string, value: any, ttl: number | null = null): Promise<void> => {
    // Ensure redisClient is properly initialized before calling set
    if (!redisClient) {
        throw new Error('Redis client is not initialized.');
    }

    try {
        let transaction = redisClient.multi().hset(key, value);
        if (ttl) {
            transaction = transaction.expire(key, ttl);
        }
        await transaction.exec();
    } catch (error: any) {
        throw new Error(error); // Or handle it based on its type, e.g., error.message
    }
};


// Function to get a value from Redis
const redisHgetAll = async (key: string): Promise<{ [key: string]: string | number | null } | null> => {
    // Ensure redisClient is properly initialized before calling get
    if (!redisClient) {
        throw new Error('Redis client is not initialized.');
    }

    let redisObj: { [key: string]: string } | null = null;

    try {
        redisObj = await redisClient.hgetall(key);
        if (!Object.keys(redisObj).length) {
            redisObj = null;
        }
    } catch (error: any) {
        throw new Error(error); // Or handle it based on its type, e.g., error.message
    }

    return redisObj;
};


export { 
    redisPing,
    redisSet,
    redisGet,
    redisHset,
    redisHgetAll
}