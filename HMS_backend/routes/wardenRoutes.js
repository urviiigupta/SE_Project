import express from 'express';
import {
  getHallOccupancy,
  getAllComplaints,
  respondToComplaint,
  viewStatement,
  enterExpense
} from '../controllers/wardenController.js';

const router = express.Router();

// Get number of students in a hall
router.get('/occupancy/:hallId', getHallOccupancy);

// Get all complaints for a hall
router.get('/complaints/:hallId', getAllComplaints);

// Respond to a specific complaint
router.post('/complaints/respond/:complaintId', respondToComplaint);

// View statement of accounts (sum of expenses)
router.get('/statement/:hallId', viewStatement);

// Enter a new expense
router.post('/expense', enterExpense);

export default router;
