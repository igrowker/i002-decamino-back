import express from 'express';
import Stripe from 'stripe';
import * as paymentService from '../services/payment.service.js';
import { createCheckoutSessionController } from '../controllers/payment.controller.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', createCheckoutSessionController);

// router.post('/create-checkout-session', async (req, res) => {
//     const { reservationId, description, pricePerPerson, numberOfPeople } = req.body;

//     try {

//         // const reservation = await Reservation.findById(reservationId);

//         // if (!reservation) {
//         //     return res.status(404).json({ error: 'Reservation not found' });
//         // }

//         // Calcular el total
//         const totalPrice = pricePerPerson * numberOfPeople;

//         // Crear la sesión de pago en Stripe
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [{
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: description,
//                     },
//                     unit_amount: pricePerPerson,
//                 },
//                 quantity: numberOfPeople,
//             }],
//             mode: 'payment',
//             success_url: 'https://tu-sitio.com/success',
//             cancel_url: 'https://tu-sitio.com/cancel',
//         });

//         // Guardar el pago en la base de datos
//         const payment = new Payment({
//             sessionId: session.id,
//             status: 'pending',
//             //reservation: reservation._id,
//             amount: totalPrice
//         });

//         await payment.save();

//         // Devolver la URL de Stripe
//         res.json({ url: session.url });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

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
            //TODO Define y llama a un método para manejar la intención de pago exitosa.
            handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'checkout.session.completed':
            handleCheckoutSessionCompleted(event.data.object);
            break;
        default:
            console.log(`Tipo de evento no controlado ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
});

async function handlePaymentIntentSucceeded(paymentIntent) {
    try {
        // Buscar el pago en la base de datos
        //const payment = await Payment.findOne({ sessionId: paymentIntent.id });
        const payment = await paymentService.findOne({ sessionId: paymentIntent.id });
        if (!payment) {
            console.error(`Payment with sessionId ${paymentIntent.id} not found.`);
            return;
        }

        // Actualizar el estado del pago 
        payment.status = 'confirmed';
        await payment.save();
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Actualizar el estado de la reserva asociada
        //await Reservation.findByIdAndUpdate(payment.reservation, { status: 'confirmed' });

        //console.log(`PaymentIntent for ${paymentIntent.amount} was successful! Reservation ${payment.reservation} confirmed.`);

        // Aquí puedes agregar código para notificar al usuario, por ejemplo, enviando un correo electrónico

    } catch (error) {
        console.error(`Error handling payment intent: ${error.message}`);
    }
}

async function handleCheckoutSessionCompleted(session) {
    try {
        const payment = await paymentService.findOne({ sessionId: session.id });

        if (!payment) {
            console.error(`Payment with sessionId ${session.id} not found.`);
            return;
        }

        payment.status = 'confirmed';
        await payment.save();

        //await Reservation.findByIdAndUpdate(payment.reservation, { status: 'confirmed' });

        console.log(`Payment for reservation ${payment.reservation} was successful!`);
    } catch (error) {
        console.error(`Error handling session completion: ${error.message}`);
    }
}


export default router;
