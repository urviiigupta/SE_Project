import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
  role: { type: String, enum: ['attendant', 'gardener'], required: true },
  dailyPay: { type: Number, required: true },
  leaveDates: { type: [Date], default: [] }
});

const Staff = mongoose.model('Staff', staffSchema);
export default Staff;
