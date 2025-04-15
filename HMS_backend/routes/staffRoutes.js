import express from 'express';
import {
  addStaff,
  removeStaff,
  markLeave,
  generateSalarySheet,
  addPettyExpense
} from '../controllers/staffController.js';

const router = express.Router();

router.post('/add', addStaff);
router.delete('/:id', removeStaff);
router.post('/leave/:id', markLeave);
router.get('/salary-sheet/:hallId', generateSalarySheet);
router.post('/petty-expense', addPettyExpense);

export default router;
