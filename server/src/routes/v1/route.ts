import express, { Router } from 'express';
import roomRouter from './room.route';

const router: Router = express.Router();
router.use('/rooms', roomRouter);

export default router;