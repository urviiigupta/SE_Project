import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import connectToDatabase from '../db/db.js';
import User from '../models/User.js';

const seedUsers = async () => {
  await connectToDatabase();

  try {
    await User.deleteMany();

    const hash = (pwd) => bcrypt.hash(pwd, 10);

    const [adminPassword, studentPassword, wardenPassword, controlPassword, messPassword, clerkPassword, hmcPassword] = await Promise.all([
      hash('admin'),
      hash('student'),
      hash('warden'),
      hash('control'),
      hash('mess'),
      hash('clerk'),
      hash('hmc'),
    ]);

    await Promise.all([
      User.create({ name: 'Admin', email: 'admin@hms.com', password: adminPassword, role: 'admin' }),
      User.create({ name: 'Student', email: 'student@hms.com', password: studentPassword, role: 'student' }),
      User.create({ name: 'Warden', email: 'warden@hms.com', password: wardenPassword, role: 'hall_warden' }),
      User.create({ name: 'Controlling Warden', email: 'control@hms.com', password: controlPassword, role: 'controlling_warden' }),
      User.create({ name: 'Mess Manager', email: 'mess@hms.com', password: messPassword, role: 'mess_manager' }),
      User.create({ name: 'Hall Clerk', email: 'clerk@hms.com', password: clerkPassword, role: 'hall_clerk' }),
      User.create({ name: 'HMC Chairman', email: 'hmc@hms.com', password: hmcPassword, role: 'hmc_chairman' }),
    ]);

    console.log('✅ Users created successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();
