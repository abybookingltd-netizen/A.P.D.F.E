import express from 'express';
import { getAllVolunteers, createVolunteer } from '../controllers/volunteerController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { requireStaff } from '../middleware/roleCheck.js';

const router = express.Router();

// Public route for volunteer registration
router.post('/', createVolunteer);

// Protected route for viewing volunteers
router.get('/', authenticate, requireStaff, getAllVolunteers);

export default router;
