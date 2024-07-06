import { Router } from "express";
import * as restaurantController from '../controllers/restaurant.controller.js';
import { requireAuth, isMerchant, isRestaurantOwner } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/', requireAuth, isMerchant, restaurantController.POSTRestaurant)
.get('/', restaurantController.GETRestaurants)
.get('/:id', restaurantController.GETRestaurantById)
.put('/:id', requireAuth, isMerchant, isRestaurantOwner, restaurantController.PUTRestaurant)
.delete('/:id', requireAuth, isMerchant, isRestaurantOwner, restaurantController.DELETERestaurant)

export default router;