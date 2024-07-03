//Aca van las rutas

// /routes/reservationRoutes.js

import { Router } from 'express'
import * as reservationController from '../controllers/reservation.controller.js'


//declaro variable que tiene de rutas / instanciando el objeto router

const router = Router();

// Rutas para las reservas
router.post('/reservations', reservationController.createReservation);
router.get('/reservations', reservationController.getReservations);
router.get('/reservations/:id', reservationController.getReservationById);
router.put('/reservations/:id', reservationController.updateReservation);
router.delete('/reservations/:id', reservationController.deleteReservation);

export default router;
