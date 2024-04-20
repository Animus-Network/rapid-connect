import { mongodbClient, MongoClient, Collection, Document } from '../../lib/mongodb';
import { logger, BaseLogger } from '../../lib/pino';

class MongoDBConnector {
    private client: MongoClient;
    private logger: BaseLogger;

    constructor() {
        this.client = mongodbClient;
        this.logger = logger;
    }

    async connect(): Promise<void> {
        try { 
            await this.client.connect();
            this.logger.debug(``);
        }    // Connect to the MongoDB server
        catch (error) { 
            this.logger.error(`Error connecting to MongoDB: ${error}`);
        }
    }

    async disconnect(): Promise<void> { await this.client.close(); }    // Close the connection

    async ping(): Promise<string | void> {
        try { const pingResult = await this.client.db().admin().ping();
            if (pingResult.ok) {
                return 'PONG';
            }
         }
        catch (error) { this.logger.error(`Error pinging MongoDB: ${error}`); }
    }

    db() {
        return this.client.db();
    }
}


export default new MongoDBConnector();