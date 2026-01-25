import express from 'express';
import { getAggregates } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';
import { requireStaff } from '../middleware/roleCheck.js';

const router = express.Router();

// Protected route for dashboard aggregates
router.get('/aggregates', authenticate, requireStaff, getAggregates);

export default router;
