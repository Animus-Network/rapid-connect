import express, { Router } from 'express';
import roomRouter from './room.route';

const router: Router = express.Router();
router.use('/room', roomRouter);

export default router;