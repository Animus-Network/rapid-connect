import { mongodbClient, MongoClient, Collection, Document } from '../../lib/mongodb';
import { logger, BaseLogger } from '../../lib/pino';

/**
 * MongoDBConnector class for handling MongoDB connections and operations.
 */
class MongoDBConnector {
    private client: MongoClient; // MongoDB client instance
    private logger: BaseLogger; // Logger instance for logging

    constructor() {
        this.client = mongodbClient; // Assign MongoDB client
        this.logger = logger; // Assign logger
    }

    /**
     * Connect to the MongoDB server.
     * @returns {Promise<void>} A Promise that resolves when connection is successful or rejects if an error occurs.
     */
    async connect(): Promise<void> {
        try { 
            await this.client.connect(); // Connect to MongoDB
            this.logger.debug(`Connected to MongoDB`); // Log successful connection
        } catch (error) { 
            this.logger.error(`Error connecting to MongoDB: ${error}`); // Log connection error
        }
    }

    /**
     * Close the MongoDB connection.
     * @returns {Promise<void>} A Promise that resolves when disconnection is successful or rejects if an error occurs.
     */
    async disconnect(): Promise<void> {
        await this.client.close(); // Close the MongoDB connection
    }

    /**
     * Ping the MongoDB server.
     * @returns {Promise<string | void>} A Promise that resolves with 'PONG' if ping is successful or rejects if an error occurs.
     */
    async ping(): Promise<string | void> {
        try {
            const pingResult = await this.client.db().admin().ping(); // Ping the MongoDB server
            if (pingResult.ok) {
                return 'PONG'; // Return 'PONG' if ping is successful
            }
        } catch (error) {
            this.logger.error(`Error pinging MongoDB: ${error}`); // Log ping error
        }
    }

    /**
     * Get the MongoDB database instance.
     * @returns {Db} The MongoDB database instance.
     */
    db() {
        return this.client.db(); // Return the MongoDB database instance
    }
}


export default new MongoDBConnector();