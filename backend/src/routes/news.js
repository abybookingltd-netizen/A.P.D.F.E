import express from 'express';
import {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
} from '../controllers/newsController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { requireStaff } from '../middleware/roleCheck.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public read routes
router.get('/', optionalAuth, getAllNews);
router.get('/:id', optionalAuth, getNewsById);

// Protected write routes
router.post('/', authenticate, requireStaff, upload.single('image'), createNews);
router.put('/:id', authenticate, requireStaff, upload.single('image'), updateNews);
router.delete('/:id', authenticate, requireStaff, deleteNews);

export default router;
