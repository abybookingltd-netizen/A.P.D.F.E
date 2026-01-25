import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    updateProfile,
    getProfile,
    deleteUser
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { requireAdmin, requireStaff } from '../middleware/roleCheck.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.get('/', requireStaff, getAllUsers);
router.get('/profile', getProfile);
router.get('/:id', requireStaff, getUserById);
router.put('/profile', upload.single('profilePicture'), updateProfile);
router.put('/:id', requireStaff, updateUser);
router.delete('/:id', requireAdmin, deleteUser);

export default router;
