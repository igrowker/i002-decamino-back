import { Router } from "express";
import * as restaurantController from '../controllers/restaurant.controller.js';

const router = Router();

router.post('/', restaurantController.POSTRestaurant)
.get('/', restaurantController.GETRestaurants)
.get('/:id', restaurantController.GETRestaurantById)
.put('/:id', restaurantController.PUTRestaurant)
.delete('/:id', restaurantController.DELETERestaurant)

export default router;


