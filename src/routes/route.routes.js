import express from 'express';
import * as routeController from '../controllers/route.controller.js';

const router = express.Router();

router.get('/', routeController.GETRoute)
.post('/', routeController.POSTRoute)

export default router;