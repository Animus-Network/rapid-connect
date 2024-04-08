import { Request, Response } from 'express';

async function pingHandler (req: Request, res: Response) {
    res.send( { 'error': false, 'message': 'Ping received !!' } );
}

export { pingHandler };