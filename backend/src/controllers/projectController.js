import { Project, ProjectGoal } from '../models/index.js';

// Get all projects
export const getAllProjects = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Project.findAndCountAll({
            include: [{
                model: ProjectGoal,
                as: 'goals'
            }],
            order: [['createdAt', 'DESC']],
            distinct: true,
            limit,
            offset
        });

        res.json({
            success: true,
            data: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get all projects error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get project by ID
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [{
                model: ProjectGoal,
                as: 'goals'
            }]
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Get project by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create project
export const createProject = async (req, res) => {
    try {
        const projectData = req.body;
        const goals = projectData.goals || [];

        // Calculate progress based on goals
        const progress = goals.length > 0
            ? Math.round((goals.filter(g => g.isCompleted).length / goals.length) * 100)
            : 0;

        // Create project
        const project = await Project.create({
            ...projectData,
            id: projectData.id || `proj-${Date.now()}`,
            progress,
            lastUpdated: new Date()
        });

        // Create goals if provided
        if (goals.length > 0) {
            const goalsWithProjectId = goals.map(goal => ({
                ...goal,
                id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                projectId: project.id
            }));

            await ProjectGoal.bulkCreate(goalsWithProjectId);
        }

        // Fetch complete project with goals
        const completeProject = await Project.findByPk(project.id, {
            include: [{
                model: ProjectGoal,
                as: 'goals'
            }]
        });

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: completeProject
        });
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update project
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Handle goals update separately
        if (updates.goals) {
            // Delete existing goals
            await ProjectGoal.destroy({ where: { projectId: id } });

            // Create new goals
            if (updates.goals.length > 0) {
                const goalsWithProjectId = updates.goals.map(goal => ({
                    ...goal,
                    id: `goal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    projectId: id
                }));

                await ProjectGoal.bulkCreate(goalsWithProjectId);

                // Calculate new progress
                updates.progress = Math.round(
                    (updates.goals.filter(g => g.isCompleted).length / updates.goals.length) * 100
                );
            }

            delete updates.goals;
        }

        updates.lastUpdated = new Date();
        await project.update(updates);

        // Fetch complete project with goals
        const updatedProject = await Project.findByPk(id, {
            include: [{
                model: ProjectGoal,
                as: 'goals'
            }]
        });

        res.json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject
        });
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete project
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        await project.destroy();

        res.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
