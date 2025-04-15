import Student from '../models/Student.js';
import Complaint from '../models/Complaint.js';
import Expense from '../models/Expense.js';

// 1. View occupancy for a hall
export const getHallOccupancy = async (req, res) => {
  const { hallId } = req.params;
  try {
    const students = await Student.find({ hallId });
    res.json({ count: students.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. View all complaints for a hall
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ hallId: req.params.hallId });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Post Action Taken Report (ATR) on a complaint
export const respondToComplaint = async (req, res) => {
  const { complaintId } = req.params;
  const { actionTaken } = req.body;
  try {
    await Complaint.findByIdAndUpdate(complaintId, { actionTaken });
    res.json({ message: 'ATR updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. View statement of accounts (sum of expenses)
export const viewStatement = async (req, res) => {
  const { hallId } = req.params;
  try {
    const expenses = await Expense.find({ hallId });
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    res.json({ total, details: expenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Enter a new expense
export const enterExpense = async (req, res) => {
  const { hallId, description, amount } = req.body;
  try {
    const expense = new Expense({ hallId, description, amount });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
