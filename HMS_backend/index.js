// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import messRoutes from './routes/messRoutes.js';
import wardenRoutes from './routes/wardenRoutes.js';
import hmcRoutes from './routes/hmcRoutes.js';
import staffRoutes from './routes/staffRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/mess', messRoutes);
app.use('/api/warden', wardenRoutes);
app.use('/api/hmc', hmcRoutes);
app.use('/api/staff', staffRoutes);

const PORT = 3000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
