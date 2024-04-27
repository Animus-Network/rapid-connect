import { Request, Response, NextFunction } from 'express';

// Define a custom interface that extends the Request interface
interface CustomExpressRequest extends Request {
    uuid?: string;
}

// Define a custom interface that extends the Response interface
interface CustomExpressResponse extends Response {
    uuid?: string;
}

// Define a custom interface that extends the NextFunction interface
interface CustomExpressNextFunction extends NextFunction { }

export { CustomExpressRequest, CustomExpressResponse, CustomExpressNextFunction };