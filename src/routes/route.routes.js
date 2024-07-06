import express from 'express';
import { getRouteController } from '../controllers/route.controller.js';

const router = express.Router();

router.get('/route', getRouteController);

export default router;