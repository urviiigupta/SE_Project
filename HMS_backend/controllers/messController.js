import Student from '../models/Student.js';

// Add/Update mess charges for multiple students
export const addMessCharge = async (req, res) => {
  const { charges } = req.body; // expected format: { studentId1: amount1, studentId2: amount2, ... }
  try {
    for (let studentId in charges) {
      await Student.findByIdAndUpdate(studentId, {
        messCharges: charges[studentId],
      });
    }
    res.json({ message: 'Mess charges updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get monthly dues for a hall (sum of mess charges)
export const getMonthlyDues = async (req, res) => {
  const { hallId } = req.params;
  try {
    const students = await Student.find({ hall: hallId });
    const total = students.reduce((sum, s) => sum + (s.messCharges || 0), 0);
    res.json({ totalDue: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Summary across all students (total mess collected)
export const getMessSummary = async (req, res) => {
  try {
    const students = await Student.find();
    const summary = students.map(s => ({
      student: s.name,
      email: s.email,
      messCharges: s.messCharges,
    }));
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
