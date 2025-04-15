import express from 'express';
import { body, param } from 'express-validator';
import {
  getStudentDetails,
  payDues,
  raiseComplaint,
  getComplaintsByStudent
} from '../controllers/StudentController.js';

const router = express.Router();
// Validate ID parameter
const validateId = [
  param('id').isMongoId().withMessage('Invalid student ID')
];

// Validate complaint input
const validateComplaint = [
  body('studentId').isMongoId().withMessage('Invalid student ID'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').notEmpty().withMessage('Description is required')
];

router.get('/:id', validateId, getStudentDetails);
router.post('/pay/:id', validateId, payDues);
router.post('/complaint', validateComplaint, raiseComplaint);
router.get('/:id/complaints', validateId, getComplaintsByStudent);

export default router;
