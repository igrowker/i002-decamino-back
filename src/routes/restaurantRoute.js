import { Router } from "express";
import * as restaurantController from '../controllers/restaurantController.js';

const router = Router();

router.post('/restaurants', restaurantController.createRestaurant);
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.put('/restaurants/:id', restaurantController.updateRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);




export default router;


