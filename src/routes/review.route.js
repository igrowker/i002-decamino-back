//Aca van las rutas

// /routes/reviewsRoutes.js

import { Router } from 'express'
import * as reviewsController from '../controllers/review.controller.js'


//declaro variable que tiene de rutas / instanciando el objeto router

const router = Router();

// Rutas para las reviews
router.post('/', reviewsController.POSTReview);
router.get('/', reviewsController.GETReviews);
router.get('/:id', reviewsController.GETReviewById);
router.put('/:id', reviewsController.PUTReview);
router.delete('/:id', reviewsController.DELETEReview);

export default router;