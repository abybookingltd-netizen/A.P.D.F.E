import express from 'express';
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { requireStaff } from '../middleware/roleCheck.js';

const router = express.Router();

// Public read routes
router.get('/', optionalAuth, getAllProjects);
router.get('/:id', optionalAuth, getProjectById);

// Protected write routes
router.post('/', authenticate, requireStaff, createProject);
router.put('/:id', authenticate, requireStaff, updateProject);
router.delete('/:id', authenticate, requireStaff, deleteProject);

export default router;
