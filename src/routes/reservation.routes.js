import { Router } from 'express'
import * as reservationController from '../controllers/reservation.controller.js'
import { isMerchant, isTraveler, requireAuth } from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/restaurant/:id', requireAuth, isTraveler, reservationController)  // Viajero crea una reserva
  .get('/', requireAuth, isTraveler, reservationController)  // Viajero lee sus reservas
  .get('/restaurant/', requireAuth, isMerchant, reservationController)  // Comerciante lee las reservas de su restaurant
  .put('/:id', requireAuth, reservationController)  // Cambia el estado de una reserva

export default router;
