import { pingHandler } from '../controllers/pingHandler'
import express, { Router } from 'express';


class RouterFactory {
    private router: Router;

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.router.route(pingHandler.getPath()).get(pingHandler.get);
    }

    getRouter(): Router {
        return this.router;
    }
}

const routerFactory = new RouterFactory();

export {
    routerFactory
};