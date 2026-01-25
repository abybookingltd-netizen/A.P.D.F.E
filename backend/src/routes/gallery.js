import express from 'express';
import {
    getAllGalleryItems,
    getGalleryItemById,
    createGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
} from '../controllers/galleryController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { requireStaff } from '../middleware/roleCheck.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public read routes
router.get('/', optionalAuth, getAllGalleryItems);
router.get('/:id', optionalAuth, getGalleryItemById);

// Protected write routes
router.post('/', authenticate, requireStaff, upload.single('image'), createGalleryItem);
router.put('/:id', authenticate, requireStaff, upload.single('image'), updateGalleryItem);
router.delete('/:id', authenticate, requireStaff, deleteGalleryItem);

export default router;
