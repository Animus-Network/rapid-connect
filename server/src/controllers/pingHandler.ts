import { Request, Response } from 'express';
import { BaseHandler } from './baseHandler';


class PingHandler extends BaseHandler {
    protected path: string = '/ping';

    async options(req: Request, res: Response): Promise<any> {}

    async get(req: Request, res: Response): Promise<any> {
        res.send( { 'error': false, 'message': 'Ping received !!' } );
    }

    async post(req: Request, res: Response): Promise<any> {}
    async put(req: Request, res: Response): Promise<any> {}
    async patch(req: Request, res: Response): Promise<any> {}
    async delete(req: Request, res: Response): Promise<any> {}
}

const pingHandler = new PingHandler();

export { pingHandler };