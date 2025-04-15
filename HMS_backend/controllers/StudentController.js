import Student from '../models/Student.js';
import Complaint from '../models/Complaint.js';

// GET student details by ID
export const getStudentDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user || user.role !== 'student') {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Transform user into student response
    const studentResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      // Add defaults for student-specific fields
      hall: 'Not assigned',
      roomNumber: 'Not assigned',
      roomRent: 0,
      amenityCharges: 0,
      messCharges: 0,
      totalDue: 0
    };
    
    res.status(200).json(studentResponse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const payDues = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.messCharges = 0;
    student.amenityCharges = 0;
    student.roomRent = 0;
    student.totalDue = 0;

    await student.save();
    res.status(200).json({ message: 'Dues paid successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST to raise complaint
export const raiseComplaint = async (req, res) => {
  try {
    const { studentId, category, description } = req.body;
    
    // Verify student exists first
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const complaint = new Complaint({ 
      student: studentId, 
      category, 
      description,
      status: 'pending' // Add default status
    });
    
    await complaint.save();
    res.status(201).json({ 
      message: 'Complaint raised successfully', 
      complaint 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET complaints by student ID
export const getComplaintsByStudent = async (req, res) => {
  try {
    const complaints = await Complaint.find({ student: req.params.id });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
