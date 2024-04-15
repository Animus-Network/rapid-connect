import { Request, Response } from 'express';
import status from '../utils/httpStatus';


async function createRoom(req: Request, res: Response): Promise<any> {
    res.status(status.HTTP_200.CODE).send( { 'status': 'success', 'message': status.HTTP_200.MESSAGE } );
}

export {
    createRoom
};