import * as paymentService from '../services/payment.service.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const POSTCheckoutSession = async (req, res, next) => {
  const { id, price, type } = req.body;

  try {
    const response = await paymentService.createCheckoutSession({ id, price, type });
    res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};

export const POSTWebhook = async (req, res, next) => {
  console.log("LLEGAAAAAAAAAA")
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  }
  catch (error) {
    next(error)
  }

  try {
    await paymentService.handleWebhook(event);
    res.status(200).json({ received: true });
  }
  catch (error) {
    next(error)
  }


  // switch (event.type) {
  //     case 'payment_intent.succeeded':
  //         await handlePaymentIntentSucceeded(event.data.object);
  //         console.log("Entro en handlePaymentIntentSucceeded()")
  //         break;
  //     case 'checkout.session.completed':
  //         await handleCheckoutSessionCompleted(event.data.object);
  //         console.log("Entro en handleCheckoutSessionCompleted()")
  //         break;
  //     case 'checkout.session.expired':
  //         await handleCheckoutSessionExpired(event.data.object);
  //         console.log("Entro en handleCheckoutSessionExpired()")
  //         break;
  //     default:
  //         console.log(`Tipo de evento no controlado ${event.type}`);
  // }

  // try {
  //   switch (event.type) {
  //     case 'payment_intent.succeeded':
  //       console.log("Entro en handlePaymentIntentSucceeded()");
  //       await paymentService.handlePaymentIntentSucceeded(event.data.object);
  //       break;
  //     case 'checkout.session.completed':
  //       console.log("Entro en handleCheckoutSessionCompleted()");
  //       await paymentService.handleCheckoutSessionCompleted(event.data.object);
  //       break;
  //     case 'checkout.session.expired':
  //       console.log("Entro en handleCheckoutSessionExpired()");
  //       await paymentService.handleCheckoutSessionExpired(event.data.object);
  //       break;
  //     default:
  //       console.log(`Tipo de evento no controlado ${event.type}`);
  //   }
  // }
  // catch (error) {
  //   console.error(`Error handling event ${event.type}:`, error);
  //   next(error)
  // }
};

export const GETPayments = async (req, res, next) => {
  try {
    const response = await paymentService.findPaymentsAll();
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}