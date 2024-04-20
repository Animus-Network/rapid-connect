import { Request, Response } from 'express';
import status from '../utils/httpStatus';
import redisClient from '../services/redis.service';
import mongodbClient from '../services/mongodb.service';


async function ping(req: Request, res: Response): Promise<any> {
    res.status(status.HTTP_200.CODE).send( { status: 'success', message: status.HTTP_200.MESSAGE, application: 'PONG', redis: await redisClient.ping(), mongodb: await mongodbClient.ping() } );
}

export {
    ping
};