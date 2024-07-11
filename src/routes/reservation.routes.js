import { Router } from 'express'
import * as reservationController from '../controllers/reservation.controller.js'
import { isMerchant, isTraveler, requireAuth } from '../middlewares/auth.middleware.js'

const router = Router();

router.post('/restaurant/:id', requireAuth, isTraveler, reservationController.POSTReservation)  // Viajero crea una reserva
  .put('/:id/cancel', requireAuth, isTraveler, reservationController.PUTReservationCancel)  // Viajero cancela su reserva
  .get('/', requireAuth, isTraveler, reservationController.GETUserReservations)  // Viajero lee sus reservas
  .get('/restaurant/', requireAuth, isMerchant, reservationController.GETRestaurantReservations)  // Comerciante lee las reservas de su restaurant
  .put('/:id', requireAuth, isMerchant, reservationController.PUTReservationStatus)  // Cambia el estado de una reserva

export default router;
