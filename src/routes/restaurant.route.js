import { Router } from "express";
import * as restaurantController from '../controllers/restaurant.controller.js';

const router = Router();

router.post('/restaurants', restaurantController.createRestaurant)
.get('/restaurants', restaurantController.getRestaurants)
.get('/restaurants/:id', restaurantController.getRestaurantById)
.put('/restaurants/:id', restaurantController.updateRestaurant)
.delete('/restaurants/:id', restaurantController.deleteRestaurant)

export default router;


