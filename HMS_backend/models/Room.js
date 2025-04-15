import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  hall: { type: String, required: true },
  roomNumber: { type: String, required: true },
  isTwinSharing: { type: Boolean, default: false },
  rent: { type: Number, required: true },
  occupied: { type: Boolean, default: false },
  occupant: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

const Room = mongoose.model("Room", roomSchema);
export default mongoose.models.Room || mongoose.model('Room', roomSchema);

