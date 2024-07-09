import { Router } from 'express'
import * as reservationController from '../controllers/reservation.controller.js'

const router = Router();

router.post('/reservations/restaurant/:id', reservationController)
.get('/reservations/:id', reservationController)
.get('/reservations/restaurant/:id', reservationController)
.put('/reservations/:id', reservationController)
.delete('/reservations/:id', reservationController);

export default router;
