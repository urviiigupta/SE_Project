import express from 'express';
import { allocateGrant, viewGrants } from '../controllers/hmcController.js';

const router = express.Router();

router.post('/allocate', allocateGrant);
router.get('/all', viewGrants);

export default router;

