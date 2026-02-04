import express from 'express';
import {
    getAllHelpers,
    getHelperById,
    createHelper,
    updateHelper,
    deleteHelper
} from '../controllers/helperController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/roleCheck.js';

const router = express.Router();

// All routes require authentication and admin privileges
router.use(authenticate);
router.use(requireAdmin);

router.get('/', getAllHelpers);
router.get('/:id', getHelperById);
router.post('/', createHelper);
router.put('/:id', updateHelper);
router.delete('/:id', deleteHelper);

export default router;
