import { Volunteer, User } from '../models/index.js';
import crypto from 'crypto';
import emailService from '../services/emailService.js';

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

        // Check if already approved
        if (volunteer.isApproved) {
            return res.status(400).json({
                success: false,
                message: 'Volunteer is already approved'
            });
        }

        // Check if user with this email already exists
        const existingUser = await User.findOne({ where: { email: volunteer.email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'A user with this email already exists'
            });
        }

        // Generate a temporary password
        const tempPassword = crypto.randomBytes(8).toString('hex');

        // Create helper account
        const helper = await User.create({
            id: `helper-${Date.now()}`,
            name: `${volunteer.firstName} ${volunteer.lastName}`,
            email: volunteer.email,
            password: tempPassword,
            role: 'helper',
            isValidated: true
        });

        // Update volunteer status
        await volunteer.update({ isApproved: true });

        // Send welcome email with temporary password
        try {
            await emailService.sendHelperWelcomeEmail({
                email: helper.email,
                name: helper.name,
                tempPassword
            });
            console.log('Welcome email sent to:', helper.email);
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // Don't fail the entire operation if email fails
        }

        res.json({
            success: true,
            message: 'Volunteer approved and added as helper successfully',
            data: {
                volunteer,
                helper: {
                    id: helper.id,
                    name: helper.name,
                    email: helper.email,
                    role: helper.role
                }
            }
        });
    } catch (error) {
        console.error('Approve volunteer error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
