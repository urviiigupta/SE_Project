import Staff from '../models/Staff.js';
import Expense from '../models/Expense.js';

// Add a new staff member
export const addStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove staff by ID
export const removeStaff = async (req, res) => {
  try {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    res.json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mark a leave for a specific staff
export const markLeave = async (req, res) => {
  try {
    const { id } = req.params; // staff ID from URL
    const { date } = req.body; // leave date in body
    await Staff.findByIdAndUpdate(id, { $push: { leaveDates: date } });
    res.json({ message: 'Leave marked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate salary sheet
export const generateSalarySheet = async (req, res) => {
  try {
    const { hallId } = req.params;
    const staffList = await Staff.find({ hallId });

    const salarySheet = staffList.map(staff => {
      const totalDays = 30;
      const leaveDays = staff.leaveDates.length;
      const payableDays = totalDays - leaveDays;
      const salary = staff.dailyPay * payableDays;

      return {
        name: staff.name,
        role: staff.role,
        totalDays,
        leaveDays,
        payableDays,
        salary
      };
    });

    res.json(salarySheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a petty expense
export const addPettyExpense = async (req, res) => {
  try {
    const { hallId, type, amount, description } = req.body;
    const expense = new Expense({ hall: hallId, type, amount, description });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
