import { createCheckoutSession, handlePaymentIntentSucceeded, handleCheckoutSessionCompleted ,
  handleCheckoutSessionExpired
} from '../services/payment.service.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSessionController = async (req, res) => {
  const { reservationId, description, pricePerPerson, numberOfPeople } = req.body;

  try {
    const result = await createCheckoutSession({ reservationId, description, pricePerPerson, numberOfPeople });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const handleWebhookController = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
      console.log(`⚠️ Error en la verificación de la firma del webhook.`, err.message);
      return res.sendStatus(400);
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
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log("Entro en handlePaymentIntentSucceeded()");
        await handlePaymentIntentSucceeded(event.data.object);
        break;
      case 'checkout.session.completed':
        console.log("Entro en handleCheckoutSessionCompleted()");
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      case 'checkout.session.expired':
        console.log("Entro en handleCheckoutSessionExpired()");
        await handleCheckoutSessionExpired(event.data.object);
        break;
      default:
        console.log(`Tipo de evento no controlado ${event.type}`);
    }
  } catch (error) {
    console.error(`Error handling event ${event.type}:`, error);
    return res.sendStatus(500);
  }

  res.json({ received: true });
};
