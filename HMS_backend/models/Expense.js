import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  hallId: { type: String, required: true },  // <-- Changed from `hall`
  type: { type: String, required: true },    // e.g., "Repair", "Subscription"
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
