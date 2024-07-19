import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  sessionId: {
    type: String, required: true
  },
  status: {
    type: String, default: 'pending'
  },
  amount: {
    type: Number, required: true
  },
  createdAt: {
    ype: Date, default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
