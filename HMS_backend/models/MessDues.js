// models/MessDues.js
import mongoose from 'mongoose';

const messDuesSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  month: { type: String, required: true }, // format: 'YYYY-MM'
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
});

const MessDues = mongoose.model('MessDues', messDuesSchema);
export default MessDues;
