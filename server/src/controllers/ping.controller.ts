import { Request, Response } from 'express';
import { BaseHandler, status } from './base.controller';
import redis from '../services/redis.service';
import mongodb from '../services/mongodb.service';


class PingHandler extends BaseHandler {
    protected path: string = '/ping';

    async get(req: Request, res: Response): Promise<any> {
        res.status(status.HTTP_200.CODE).send( { 'status': 'success', 'message': status.HTTP_200.MESSAGE, 'application': 'PONG', 'redis': await redis.ping(), 'mongodb': await mongodb.ping() } );
    }

}

const pingHandler = new PingHandler();

export { pingHandler };