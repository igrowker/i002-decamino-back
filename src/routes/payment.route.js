import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Webhook para manejar eventos de Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
      console.log(event.type)
      console.log(event.data.object)
    } catch (err) {
      console.log(`⚠️ Error en la verificación de la firma del webhook.`, err.message);
      return res.sendStatus(400);
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Define y llama a un método para manejar la intención de pago exitosa..
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  });

export default router;
