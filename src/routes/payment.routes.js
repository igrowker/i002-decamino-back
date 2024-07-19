import express from 'express';
import Stripe from 'stripe';
import * as paymentController from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-checkout-session', paymentController.createCheckoutSessionController)
.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhookController);

export default router;
