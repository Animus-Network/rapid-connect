import { CustomExpressRequest, CustomExpressResponse, CustomExpressNextFunction } from '../interfaces/express.interface';
import { v4 as uuidv4 } from 'uuid';

// Middleware function to assign a UUID to every incoming request
function statsMiddleware(req: CustomExpressRequest, res: CustomExpressResponse, next: CustomExpressNextFunction) {
    const uuid = uuidv4().toString();   // Generate a UUID for the request
    req.uuid = uuid;   // Assign UUID to the request
    const startTime = new Date().getTime();
    next(); // Pass control to the next middleware/route handler
    const processTime = new Date().getTime() - startTime;
    req.log.info(`Processing time for request uuid=${uuid} is ${processTime}ms`);
    res.set('X-Request-Id', uuid);  // Assign the request uuid to response header
    res.set('X-Duration-ms', processTime.toString());  // Assign the processing time to response header
}

export default statsMiddleware;