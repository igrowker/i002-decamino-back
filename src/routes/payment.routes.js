import express from 'express';
import * as paymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-checkout-session', paymentController.POSTCheckoutSession)
.post('/webhook', express.raw({ type: 'application/json' }), paymentController.POSTWebhook);

export default router;
