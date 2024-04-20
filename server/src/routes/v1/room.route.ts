import { createRoom } from '../../controllers/room.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

router.route('/create').post(createRoom)

export default router;