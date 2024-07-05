import express from 'express';
import { getRouteController } from '../controllers/routeController.js';

const router = express.Router();

router.get('/route', getRouteController);

export default router;