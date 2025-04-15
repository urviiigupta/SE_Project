import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hall: { type: String, required: true },
  roomNumber: { type: String, required: true },
  messCharges: { type: Number, default: 0 },
  roomRent: { type: Number, required: true },
  amenityCharges: { type: Number, required: true },
  totalDue: { type: Number, default: 0 }
});

const Student = mongoose.model("Student", studentSchema);
export default Student;
