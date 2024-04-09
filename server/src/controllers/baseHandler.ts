import { Request, Response } from 'express';


abstract class BaseHandler {
    protected path!: string;
    
    constructor() {
        if (new.target === BaseHandler) {
            throw new Error("Cannot instantiate abstract class");
        }
    }

    getPath(): string {
        return this.path
    }

    abstract options(req: Request, res: Response): Promise<any>;
    abstract get(req: Request, res: Response): Promise<any>;
    abstract post(req: Request, res: Response): Promise<any>;
    abstract put(req: Request, res: Response): Promise<any>;
    abstract patch(req: Request, res: Response): Promise<any>;
    abstract delete(req: Request, res: Response): Promise<any>;
}

export { BaseHandler };