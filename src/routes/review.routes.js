import { Router } from 'express'
import * as reviewsController from '../controllers/review.controller.js'
import { requireAuth, isTraveler } from '../middlewares/auth.middleware.js'

//declaro variable que tiene de rutas / instanciando el objeto router
const router = Router();

// Rutas para las reviews
router.post('/restaurant/:id', requireAuth, isTraveler, reviewsController.POSTReview)
  .get('/restaurant/:id', reviewsController.GETReviewsByRestaurant)
  .get('/:id', reviewsController.GETReviewById)
  .put('/:id', requireAuth, isTraveler, reviewsController.PUTReview)
  .delete('/:id', requireAuth, isTraveler, reviewsController.DELETEReview)

export default router;