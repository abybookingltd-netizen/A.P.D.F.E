import express from 'express';
import { getAllExpenses, createExpense } from '../controllers/expenseController.js';
import { authenticate } from '../middleware/auth.js';
import { requireStaff } from '../middleware/roleCheck.js';

const router = express.Router();

// All routes require staff authentication
router.use(authenticate, requireStaff);

router.get('/', getAllExpenses);
router.post('/', createExpense);

export default router;
