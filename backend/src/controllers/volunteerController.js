import { Volunteer } from '../models/index.js';

// Get all volunteers
export const getAllVolunteers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Volunteer.findAndCountAll({
            order: [['createdAt', 'DESC']],
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
        console.error('Get all volunteers error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create volunteer
export const createVolunteer = async (req, res) => {
    try {
        const volunteerData = req.body;

        const volunteer = await Volunteer.create({
            ...volunteerData,
            id: volunteerData.id || `vol-${Date.now()}`
        });

        res.status(201).json({
            success: true,
            message: 'Volunteer registered successfully',
            data: volunteer
        });
    } catch (error) {
        console.error('Create volunteer error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get volunteer by ID
export const getVolunteerById = async (req, res) => {
    try {
        const { id } = req.params;
        const volunteer = await Volunteer.findByPk(id);

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: 'Volunteer not found'
            });
        }

        res.json({
            success: true,
            data: volunteer
        });
    } catch (error) {
        console.error('Get volunteer by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update volunteer
export const updateVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const volunteer = await Volunteer.findByPk(id);

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: 'Volunteer not found'
            });
        }

        await volunteer.update(updateData);

        res.json({
            success: true,
            message: 'Volunteer updated successfully',
            data: volunteer
        });
    } catch (error) {
        console.error('Update volunteer error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete volunteer
export const deleteVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const volunteer = await Volunteer.findByPk(id);

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: 'Volunteer not found'
            });
        }

        await volunteer.destroy();

        res.json({
            success: true,
            message: 'Volunteer deleted successfully'
        });
    } catch (error) {
        console.error('Delete volunteer error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Approve volunteer
export const approveVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const volunteer = await Volunteer.findByPk(id);

        if (!volunteer) {
            return res.status(404).json({
                success: false,
                message: 'Volunteer not found'
            });
        }

        await volunteer.update({ isApproved: true });

        res.json({
            success: true,
            message: 'Volunteer approved successfully',
            data: volunteer
        });
    } catch (error) {
        console.error('Approve volunteer error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
