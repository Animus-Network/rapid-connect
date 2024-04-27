import redisClient from "../../lib/redis";

class RedisService {
    private client: any; // Private property to hold the Redis client

    constructor() {
        this.client = redisClient;  // Initialize the Redis client
        // Check if the client is properly initialized
        if (!this.client) {
            throw new Error('Redis client is not initialized.');
        }
    }

    // Method to ping the Redis server
    async ping(): Promise<string> {
        try {
            const result = await this.client.ping(); // Ping the Redis server
            return result; // Return the ping result
        } catch (error: any) {
            throw new Error(error); // Throw any encountered errors
        }
    }

    // Method to set a key-value pair in Redis
    async set(key: string, value: string | number, ttl: number | null = null): Promise<void> {
        try {
            let transaction = this.client.multi().set(key, value); // Begin a transaction to set the key-value pair
            // If TTL (time to live) is provided, set expiration for the key
            if (ttl) {
                transaction = transaction.expire(key, ttl);
            }
            await transaction.exec(); // Execute the transaction
        } catch (error: any) {
            throw new Error(error); // Throw any encountered errors
        }
    }

    // Method to get the value associated with a key from Redis
    async get(key: string): Promise<string | number | null> {
        let value: string | number | null = null; // Initialize value variable
        try {
            value = await this.client.get(key); // Get the value associated with the key
        } catch (error: any) {
            throw new Error(error); // Throw any encountered errors
        }
        return value; // Return the retrieved value
    }

    // Method to set a hash field in Redis
    async hset(key: string, value: any, ttl: number | null = null): Promise<void> {
        try {
            let transaction = this.client.multi().hset(key, value); // Begin a transaction to set the hash field
            // If TTL (time to live) is provided, set expiration for the key
            if (ttl) {
                transaction = transaction.expire(key, ttl);
            }
            await transaction.exec(); // Execute the transaction
        } catch (error: any) {
            throw new Error(error); // Throw any encountered errors
        }
    }

    // Method to get all hash fields and values from Redis
    async hgetall(key: string): Promise<{ [key: string]: string | number | null } | null> {
        let redisObj: { [key: string]: string } | null = {}; // Initialize Redis object variable

        try {
            redisObj = await this.client.hgetall(key); // Get all hash fields and values
            // If no object is returned or if it's an empty object, set redisObj to null
            if (!redisObj || !Object.keys(redisObj).length) {
                redisObj = null;
            }
        } catch (error: any) {
            throw new Error(error); // Throw any encountered errors
        }

        return redisObj; // Return the retrieved Redis object
    }
}


export default new RedisService();