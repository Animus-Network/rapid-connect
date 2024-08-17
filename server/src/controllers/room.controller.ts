import { CustomExpressRequest, CustomExpressResponse } from '../interfaces/express.interface';

import { validator, Ajv } from '../../lib/validator';

import { CreateRoom } from '../interfaces/room.interface';
import { createRoomSchema } from '../schema/room.schema';
import mongoClient from '../services/mongodb.service';
import redisClient from '../services/redis.service';
import status from '../utils/httpStatus';


async function createRoom(req: CustomExpressRequest, res: CustomExpressResponse): Promise<void> {
    req.log.debug(`Received request: id=${req.uuid} body=${req.body}`);

    // Check if room object has `needAuth` else default to `false`
    if (!req.body.needAuth) {
        req.log.debug(`Setting 'needAuth' to 'false': id=${req.uuid}`);
        req.body.needAuth = false;
    }

    req.body.createdAt = new Date().getTime();  // default `createdAt` to current time

    // Using `ajv` for schema validation
    const validate = validator.compile<CreateRoom>(createRoomSchema);
    const validationResult: any = validate(req.body);

    try {
        if (validationResult instanceof Promise) {  // The result of validation should be a `Promise` "In some cases it is a boolean"
            req.log.debug(`Validating Request body: id=${req.uuid}`);
            validationResult.then(async (data: CreateRoom) => {
                req.log.debug(`Validated Request body: id=${req.uuid}`);
                
                const collection = mongoClient.db().collection('rooms');    // Connecting to the `rooms` collection
                
                try {
                    await collection.insertOne(data);
                    req.log.debug(`Data inserted to database: id=${req.uuid}`);
                    
                    if ('_id' in data) {
                        req.log.debug(`Inserting room details to redis database: id=${req.uuid}`);
                        await redisClient.hset(data._id as string, data, 60 * 60)  // Update room details in redis for 1hr
                    }
                    
                    res.status(status.HTTP_201.CODE).send({ status: 'success', message: status.HTTP_201.MESSAGE, data: data});
                } catch (error: any) {
                    req.log.error(`Failed data insertion: id=${req.uuid} error=${error.message}`);
                    res.status(status.HTTP_500.CODE).send({ 'status': 'error', 'message': error.message});
                }
                
            }).catch((error: any) => {
                if (error instanceof Ajv.ValidationError) {
                    req.log.error(`Failed to validate request body: id=${req.uuid} error=${error.errors[0].message}`);
                    res.status(status.HTTP_400.CODE).send({ status: 'error', message: `${error.errors[0].instancePath} ${error.errors[0].message}` });
                } else {
                    req.log.error(`Failed to validate request body: id=${req.uuid} error=${error.message}`);
                    res.status(status.HTTP_500.CODE).send({ status: 'error', message: error.message});
                }
            });
        } else { 
            req.log.error(`Validate not an instance of promise: id=${req.uuid}`);
            throw Error(status.HTTP_500.MESSAGE);
        }
        
    } catch (error: any) {
        res.status(status.HTTP_500.CODE).send({ status: 'error', message: error.message});
    }

}


async function getRooms(req: CustomExpressRequest, res: CustomExpressResponse): Promise<void> {
    req.log.debug(`Received request: id=${req.uuid} queryparams=${req.query}`);

    // Using `ajv` for schema validation
    const validate = validator.compile<CreateRoom>(createRoomSchema);
    const validationResult: any = validate(req.body);

    try {
        if (validationResult instanceof Promise) {  // The result of validation should be a `Promise` "In some cases it is a boolean"
            req.log.debug(`Validating Request body: id=${req.uuid}`);
            validationResult.then(async (data: CreateRoom) => {
                req.log.debug(`Validated Request body: id=${req.uuid}`);
                
                const collection = mongoClient.db().collection('rooms');    // Connecting to the `rooms` collection
                
                try {
                    await collection.insertOne(data);
                    req.log.debug(`Data inserted to database: id=${req.uuid}`);
                    
                    if ('_id' in data) {
                        req.log.debug(`Inserting room details to redis database: id=${req.uuid}`);
                        await redisClient.hset(data._id as string, data, 60 * 60)  // Update room details in redis for 1hr
                    }
                    
                    res.status(status.HTTP_201.CODE).send({ status: 'success', message: status.HTTP_201.MESSAGE, data: data});
                } catch (error: any) {
                    req.log.error(`Failed data insertion: id=${req.uuid} error=${error.message}`);
                    res.status(status.HTTP_500.CODE).send({ 'status': 'error', 'message': error.message});
                }
                
            }).catch((error: any) => {
                if (error instanceof Ajv.ValidationError) {
                    req.log.error(`Failed to validate request body: id=${req.uuid} error=${error.errors[0].message}`);
                    res.status(status.HTTP_400.CODE).send({ status: 'error', message: `${error.errors[0].instancePath} ${error.errors[0].message}` });
                } else {
                    req.log.error(`Failed to validate request body: id=${req.uuid} error=${error.message}`);
                    res.status(status.HTTP_500.CODE).send({ status: 'error', message: error.message});
                }
            });
        } else { 
            req.log.error(`Validate not an instance of promise: id=${req.uuid}`);
            throw Error(status.HTTP_500.MESSAGE);
        }
        
    } catch (error: any) {
        res.status(status.HTTP_500.CODE).send({ status: 'error', message: error.message});
    }

}


export {
    createRoom
};