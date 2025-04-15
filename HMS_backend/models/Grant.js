import mongoose from 'mongoose';

const grantSchema = new mongoose.Schema({
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
  amount: { type: Number, required: true },
  allocatedAt: { type: Date, default: Date.now }
});

const Grant = mongoose.model('Grant', grantSchema);
export default Grant;
