import { Request, Response } from 'express';
import status from '../utils/httpStatus';
import redisClient from '../services/redis.service';
import mongodbClient from '../services/mongodb.service';


async function ping(req: Request, res: Response): Promise<any> {
    // Send a response with status code 200, indicating success, along with information about the application's status and the status of connected services
    res.status(status.HTTP_200.CODE).send({
        status: 'success',
        message: status.HTTP_200.MESSAGE,
        application: 'PONG',
        redis: await redisClient.ping(),    // Ping the Redis server and await the response
        mongodb: await mongodbClient.ping() // Ping the MongoDB server and await the response
    });
}


export {
    ping
};