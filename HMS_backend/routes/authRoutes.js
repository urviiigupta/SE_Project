import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();
router.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
  });
router.post('/login', login);
router.post('/register', register);

export default router;