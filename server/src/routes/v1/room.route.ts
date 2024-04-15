import { createRoom } from '../../controllers/room.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

router.route('/create').get(createRoom)

export default router;