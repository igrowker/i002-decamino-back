import express from 'express';
import Stripe from 'stripe';
import * as paymentController from '../controllers/payment.controller.js';
// import { createCheckoutSessionController, handleWebhookController } from '../controllers/payment.controller.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', paymentController.createCheckoutSessionController)
.get('/all', paymentController.GETPayments)
.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhookController);

export default router;
