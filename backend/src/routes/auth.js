import express from 'express';
import {  registerStaff, logout, getCurrentUser, sendOTP, verifyOTP } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/roleCheck.js';

const router = express.Router();

// Public routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/logout', logout);

// Protected routes
router.get('/me', authenticate, getCurrentUser);
router.post('/register-staff', authenticate, requireAdmin, registerStaff);

export default router;
