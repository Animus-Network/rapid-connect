import express, { Router } from 'express';

import statsMiddleware from '../middlewares/stats.moddleware';
import v1Router from './v1/route';
import { ping } from '../controllers/ping.controller';

const router: Router = express.Router();

router.route('/ping').get(ping)
router.use('/api/v1', statsMiddleware, v1Router)

export default router;