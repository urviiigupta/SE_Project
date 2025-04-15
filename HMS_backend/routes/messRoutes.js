import express from 'express';
import {
  addMessCharge,
  getMonthlyDues,
  getMessSummary
} from '../controllers/messController.js';

const router = express.Router();

// Mess Manager adds charges
router.post('/add-charge', addMessCharge);

// Get dues of all students in a hall
router.get('/dues/:hallId', getMonthlyDues);

// Get mess collection summary
router.get('/summary', getMessSummary);

export default router;
