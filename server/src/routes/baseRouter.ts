import { pingHandler } from '../controllers/baseController'
import express, { Router } from 'express';

const router: Router = express.Router();

// Declare a base route
router.route('/ping').get(pingHandler);

export {
    router
};