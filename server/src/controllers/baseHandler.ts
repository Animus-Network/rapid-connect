import { Request, Response } from 'express';
import HttpStatusCodes from '../utils/httpStatus';


class BaseHandler {
    protected path!: string;
    
    constructor() {
        if (new.target === BaseHandler) {
            throw new Error("Cannot instantiate abstract class");
        }
    }

    getPath(): string {
        return this.path
    }

    options(req: Request, res: Response): Promise<any> | void { res.status(HttpStatusCodes.HTTP_405.CODE).send( { 'status': 'failed', 'message': HttpStatusCodes.HTTP_405.MESSAGE } ) };
    get(req: Request, res: Response): Promise<any> | void { res.status(HttpStatusCodes.HTTP_405.CODE).send( { 'status': 'failed', 'message': HttpStatusCodes.HTTP_405.MESSAGE } ) };
    post(req: Request, res: Response): Promise<any> | void { res.status(HttpStatusCodes.HTTP_405.CODE).send( { 'status': 'failed', 'message': HttpStatusCodes.HTTP_405.MESSAGE } ) };
    put(req: Request, res: Response): Promise<any> | void { res.status(HttpStatusCodes.HTTP_405.CODE).send( { 'status': 'failed', 'message': HttpStatusCodes.HTTP_405.MESSAGE } ) };
    patch(req: Request, res: Response): Promise<any> | void { res.status(HttpStatusCodes.HTTP_405.CODE).send( { 'status': 'failed', 'message': HttpStatusCodes.HTTP_405.MESSAGE } ) };
    delete(req: Request, res: Response): Promise<any> | void { res.status(HttpStatusCodes.HTTP_405.CODE).send( { 'status': 'failed', 'message': HttpStatusCodes.HTTP_405.MESSAGE } ) };
}

export { BaseHandler, HttpStatusCodes };