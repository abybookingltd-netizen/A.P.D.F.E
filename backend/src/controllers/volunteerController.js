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
