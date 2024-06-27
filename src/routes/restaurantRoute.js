import { Router } from "express";
import * as restaurantController from '../controllers/restaurantController.js';

const router = Router();

router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);

export default router;


