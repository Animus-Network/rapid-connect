import { Request, Response } from 'express';
import { BaseHandler, HttpStatusCodes } from './baseHandler';


class PingHandler extends BaseHandler {
    protected path: string = '/ping';

    async get(req: Request, res: Response): Promise<any> {
        res.status(HttpStatusCodes.HTTP_405.CODE).send( { 'status': 'failed', 'message': HttpStatusCodes.HTTP_405.MESSAGE } );
    }

}

const pingHandler = new PingHandler();

export { pingHandler };