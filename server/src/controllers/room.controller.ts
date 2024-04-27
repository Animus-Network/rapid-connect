import { CustomExpressRequest, CustomExpressResponse } from '../interfaces/express.interface';

import { validator, Ajv } from '../../lib/validator';

import { CreateRoom } from '../interfaces/room.interface';
import { createRoomSchema } from '../schema/room.schema';
import mongoClient from '../services/mongodb.service';
import status from '../utils/httpStatus';


async function createRoom(req: CustomExpressRequest, res: CustomExpressResponse): Promise<void> {
    req.log.debug(`Received request: ${req.body} for creating room`);

    // Check if room object has `needAuth` else default to `false`
    if (!req.body.needAuth) {
        req.body.needAuth = false;
    }

    // Using `ajv` for schema validation
    const validate = validator.compile<CreateRoom>(createRoomSchema);
    const validationResult: any = validate(req.body);

    try {
        if (validationResult instanceof Promise) {  // The result of validation should be a `Promise` "In some cases it is a boolean"
            validationResult.then(async (data: CreateRoom) => {


                const collection = mongoClient.db().collection('rooms');    // Connecting to the `rooms` collection

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