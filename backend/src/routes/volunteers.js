import express from 'express';
import {
    getAllVolunteers,
    createVolunteer,
    getVolunteerById,
    updateVolunteer,
    deleteVolunteer,
    approveVolunteer
} from '../controllers/volunteerController.js';
import { authenticate } from '../middleware/auth.js';
import { requireStaff } from '../middleware/roleCheck.js';

const router = express.Router();

// Public route for volunteer registration
router.post('/', createVolunteer);

// Protected route for viewing volunteers
router.get('/', authenticate, requireStaff, getAllVolunteers);

// Protected routes for managing volunteers
router.get('/:id', authenticate, requireStaff, getVolunteerById);
router.put('/:id', authenticate, requireStaff, updateVolunteer);
router.delete('/:id', authenticate, requireStaff, deleteVolunteer);
router.patch('/:id/approve', authenticate, requireStaff, approveVolunteer);

export default router;
