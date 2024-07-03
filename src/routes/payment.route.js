import express from 'express';
import Stripe from 'stripe';
import * as paymentService from '../services/payment.service.js';
import { createCheckoutSessionController, handleWebhookController } from '../controllers/payment.controller.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', createCheckoutSessionController)
.post('/webhook', express.raw({ type: 'application/json' }), handleWebhookController);

export default router;
