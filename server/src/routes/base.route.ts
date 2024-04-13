import { BaseHandler } from '../controllers/base.controller'
import { pingHandler } from '../controllers/ping.controller'
import express, { Router } from 'express';


class RouterFactory {
    private router: Router;
    private handlers: BaseHandler[] = [
        pingHandler
    ]

    constructor() {
        this.router = express.Router();
        this.registerRoutes();
    }

    private registerRoutes(): void {
        this.handlers.forEach(handler => {
            // this.router.route(handler.getPath()).options(handler.options);
            this.router.route(handler.getPath()).get(handler.get);
            this.router.route(handler.getPath()).post(handler.post);
            this.router.route(handler.getPath()).put(handler.put);
            this.router.route(handler.getPath()).patch(handler.patch);
            this.router.route(handler.getPath()).delete(handler.delete);
        });
    }

    getRouter(): Router {
        return this.router;
    }
}

const routerFactory = new RouterFactory();

export {
    routerFactory
};