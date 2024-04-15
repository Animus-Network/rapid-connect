import express, { Router } from 'express';
import v1Router from './v1/route';
import { ping } from '../controllers/ping.controller';

const router: Router = express.Router();

router.route('/ping').get(ping)
router.use('/api/v1', v1Router)

export default router;