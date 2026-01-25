import express from 'express';
import { getAllDonations, createDonation } from '../controllers/donationController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { requireStaff } from '../middleware/roleCheck.js';

const router = express.Router();

// Public route for donations
router.post('/', createDonation);

// Protected route for viewing donations
router.get('/', authenticate, requireStaff, getAllDonations);

export default router;
