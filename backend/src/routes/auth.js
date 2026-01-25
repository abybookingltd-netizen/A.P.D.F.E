import express from 'express';
import { login, registerStaff, logout, getCurrentUser } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/roleCheck.js';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/me', authenticate, getCurrentUser);
router.post('/register-staff', authenticate, requireAdmin, registerStaff);

export default router;
