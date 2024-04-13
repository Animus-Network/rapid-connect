import { Request, Response } from 'express';
import { BaseHandler, status } from './base.controller';
import { redisPing } from '../services/redis.service';


class PingHandler extends BaseHandler {
    protected path: string = '/ping';

    async get(req: Request, res: Response): Promise<any> {
        res.status(status.HTTP_200.CODE).send( { 'status': 'success', 'message': status.HTTP_200.MESSAGE, 'redis': await redisPing() } );
    }

}

const pingHandler = new PingHandler();

export { pingHandler };