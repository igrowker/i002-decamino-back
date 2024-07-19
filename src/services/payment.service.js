import Stripe from 'stripe';
import Payment from '../models/payment.model.js';
import Reservation from '../models/reservation.model.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const findOne = async (data) => {
//   try {
//     const payment = Payment.findOne(data);
//     return payment;
//   } catch (error) {
//     throw (error);
//   }
// }

// export const findPaymentsAll = async (data) => {
//   try {
//     const payments = Payment.find();
//     console.log(payments);
//     return payments;
//   } catch (error) {
//     throw (error);
//   }
// }

export const createCheckoutSession = async ({ id, price, type }) => {
  try {
    let item;
    if (type === 'reservation') {
      item = await Reservation.findById(id);
    } 
    // else if (type === 'order') {
    //   item = await Order.findById(id);
    // }

    if (!item) {
      throw new Error('Item not found');
    }

    // Crear la sesión de pago en Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: type,
          },
          unit_amount: price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      //URL de respuestas => tarea del front
      success_url: `${process.env.FRONT_URL}/success`,
      cancel_url: `${process.env.FRONT_URL}/cancel`,
    });

    // Guardar el pago en la base de datos
    const payment = new Payment({
      sessionId: session.id,
      status: 'pending',
      amount: price
    });

    console.log("Pago creado en espera de confirmacion: ", payment);
    await Payment.create(payment);

    return { url: session.url };
  }
  catch (error) {
    throw error;
  }
};

export const handleWebhook = async (event) => {
  const session = event.data.object;
  const { type, id } = session.metadata;

  if (session.payment_status === 'paid') {
    const payment = await Payment.findOneAndUpdate({ sessionId: session.id }, { status: 'confirmed' });

    if (type === 'reservation') {
      await Reservation.findByIdAndUpdate(id, { status: 'confirmada', paymentId: payment._id });
    } 
    // else if (type === 'order') {
    //   await Order.findByIdAndUpdate(id, { status: 'confirmada', paymentId: payment._id });
    // }
  }
};

export const handlePaymentIntentSucceeded = async (paymentIntent) => {
  try {
    const payment = await Payment.findOne({ sessionId: paymentIntent.id });

    if (!payment) {
      console.error(`Payment with sessionId ${paymentIntent.id} not found.`);
      return;
    }

    payment.status = 'confirmed';
    await payment.save();

    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);

    // Actualiza la reserva si es necesario
    // await Reservation.findByIdAndUpdate(payment.reservation, { status: 'confirmed' });
  } catch (error) {
    console.error(`Error handling payment intent: ${error.message}`);
  }
};

export const handleCheckoutSessionCompleted = async (session) => {
  try {
    const payment = await Payment.findOne({ sessionId: session.id });

    if (!payment) {
      console.error(`Payment with sessionId ${session.id} not found.`);
      return;
    }

    payment.status = 'confirmed';
    await payment.save();

    // Actualiza la reserva si es necesario
    // await Reservation.findByIdAndUpdate(payment.reservation, { status: 'confirmed' });

    //console.log(`Payment for reservation ${payment.reservation} was successful!`);
  } catch (error) {
    console.error(`Error handling session completion: ${error.message}`);
  }
};

export const handleCheckoutSessionExpired = async (session) => {
  try {
    const payment = await Payment.findOne({ sessionId: session.id });

    if (!payment) {
      console.error(`Payment with sessionId ${session.id} not found.`);
      return;
    }

    payment.status = 'expired';
    await payment.save();

    //await Reservation.findByIdAndUpdate(payment.reservation, { status: 'canceled' });

    //console.log(`Payment for reservation ${payment.reservation} was canceled.`);
  } catch (error) {
    console.error(`Error handling session expiration: ${error.message}`);
  }
}
