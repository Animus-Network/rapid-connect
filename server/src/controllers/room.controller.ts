import { Request, Response } from 'express';

import { CreateRoom } from '../interfaces/room.interface';
import { createRoomSchema } from '../schema/room.schema';
import mongoClient from '../services/mongodb.service';
import { validator, Ajv } from '../../lib/validator';
import status from '../utils/httpStatus';


async function createRoom(req: Request, res: Response): Promise<void> {
    req.log.debug(`Received request: ${req.body} for creating room`);

    const validate = validator.compile<CreateRoom>(createRoomSchema);
    const validationResult: any = validate(req.body);

    try {
        if (validationResult instanceof Promise) {
            validationResult.then(async (data: CreateRoom) => {

                const collection = mongoClient.db().collection('rooms');

                try {
                    await collection.insertOne(data);
                    res.status(status.HTTP_201.CODE).send({ status: 'success', message: status.HTTP_201.MESSAGE, data: data});
                } catch (error: any) {
                    res.status(status.HTTP_500.CODE).send({ 'status': 'error', 'message': error.message});
                }

            }).catch((error: any) => {
                if (error instanceof Ajv.ValidationError) {
                    res.status(status.HTTP_400.CODE).send({ status: 'error', message: `${error.errors[0].instancePath} ${error.errors[0].message}` });
                } else {
                    res.status(status.HTTP_500.CODE).send({ status: 'error', message: error.message});
                }
            });
        } else { 
            throw Error(status.HTTP_500.MESSAGE);
        }
        
    } catch (error: any) {
        res.status(status.HTTP_500.CODE).send({ status: 'error', message: error.message});
    }

}

export {
    createRoom
};