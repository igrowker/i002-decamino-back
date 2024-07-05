import express from 'express';
import { getOsmDataController } from '../controllers/osmController.js';

const router = express.Router();

router.get('/osm', getOsmDataController);

export default router;