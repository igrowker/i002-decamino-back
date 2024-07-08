import { Router } from "express";
import * as restaurantController from '../controllers/restaurant.controller.js';
import { requireAuth, isMerchant, hasRestaurant } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/', requireAuth, isMerchant, restaurantController.POSTRestaurant)
.get('/', restaurantController.GETRestaurants)
.get('/:id', restaurantController.GETRestaurantById)
.put('/', requireAuth, isMerchant, hasRestaurant, restaurantController.PUTRestaurant)
.delete('/', requireAuth, isMerchant, hasRestaurant, restaurantController.DELETERestaurant)

export default router;