import { createCheckoutSession } from '../services/payment.service.js';

export const createCheckoutSessionController = async (req, res) => {
  const { reservationId, description, pricePerPerson, numberOfPeople } = req.body;

  try {
    const result = await createCheckoutSession({ reservationId, description, pricePerPerson, numberOfPeople });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
