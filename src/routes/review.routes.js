import { Router } from 'express'
import * as reviewsController from '../controllers/review.controller.js'
import { requireAuth, isTraveler, isReviewAuthor, validateId } from '../middlewares/auth.middleware.js'

const router = Router();

// Rutas para las reviews
router.post('/restaurant/:id', requireAuth, isTraveler, reviewsController.POSTReview)
  .get('/restaurant/:id', validateId, reviewsController.GETReviewsByRestaurant)
  .get('/:id', reviewsController.GETReviewById)
  .put('/:id', requireAuth, isTraveler, isReviewAuthor, reviewsController.PUTReview)
  .delete('/:id', requireAuth, isTraveler, isReviewAuthor, reviewsController.DELETEReview)

export default router;