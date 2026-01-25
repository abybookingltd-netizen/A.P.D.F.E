import express from 'express';
import {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { requireStaff } from '../middleware/roleCheck.js';

const router = express.Router();

// Public read routes
router.get('/', optionalAuth, getAllEvents);
router.get('/:id', optionalAuth, getEventById);

// Protected write routes
router.post('/', authenticate, requireStaff, createEvent);
router.put('/:id', authenticate, requireStaff, updateEvent);
router.delete('/:id', authenticate, requireStaff, deleteEvent);

export default router;
