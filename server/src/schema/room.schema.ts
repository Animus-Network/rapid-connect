import { JSONSchemaType } from 'ajv'
import { CreateRoom } from '../interfaces/room.interface';

const createRoomSchema: JSONSchemaType<CreateRoom> = {
    $async: true,
    type: 'object',
    properties: {
        hostUser: { type: 'string' },
        hostIp: { type: 'string' },
        hostUniqueId: { type: 'string' },
        needAuth: { type: 'boolean', default: false }
    },
    required: [ 'hostUser', 'hostIp', 'hostUniqueId' ]
};


export { 
    createRoomSchema
 };