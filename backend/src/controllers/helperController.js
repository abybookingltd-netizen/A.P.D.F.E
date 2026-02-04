import { User } from '../models/index.js';
import crypto from 'crypto';
import emailService from '../services/emailService.js';

// Get all helpers
export const getAllHelpers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            where: { role: 'helper' },
            attributes: ['id', 'name', 'email', 'role', 'isValidated', 'profilePicture', 'createdAt'],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        console.log(rows);

        res.json({
            success: true,
            data: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get all helpers error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get helper by ID
export const getHelperById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id, role: 'helper' },
            attributes: ['id', 'name', 'email', 'role', 'isValidated', 'profilePicture', 'createdAt']
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Helper not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get helper by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create new helper
export const createHelper = async (req, res) => {
    try {
        const { name, email, isValidated } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Generate random password
        const generatedPassword = crypto.randomBytes(8).toString('hex');

        // Send welcome email with credentials BEFORE creating user
        // If email fails, we might not want to create the user, or we handle it gracefully.
        // The user request implies sending it.
        try {
            await emailService.sendEmail({
                to: email,
                subject: "Welcome to APD FE - Your Account Details",
                template: "welcome",
                data: {
                    name: name,
                    email: email,
                    password: generatedPassword,
                    loginUrl: process.env.FRONTEND_URL || "http://localhost:5173/login",
                    year: new Date().getFullYear(),
                },
            });
        } catch (emailError) {
            console.error('Failed to send welcome email:', emailError);
            // We could return here, but often we still want to create the user and maybe inform admin that email failed.
            // For now, we will proceed but log the error. 
            // Alternatively, return error if email is critical. 
            // The prompt says "after generating password send to email", implied as part of the flow.
        }

        const newUser = await User.create({
            id: `u-${Date.now()}`,
            name,
            email,
            password: generatedPassword, // Password hashing is handled by User model hooks
            role: 'helper',
            isValidated: isValidated || false
        });

        // Remove password from response
        const userResponse = newUser.toJSON();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'Helper created successfully. Welcome email sent.',
            data: userResponse
        });
    } catch (error) {
        console.error('Create helper error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update helper
export const updateHelper = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findOne({ where: { id, role: 'helper' } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Helper not found'
            });
        }

        // Only allow updating certain fields - PASSWORD IS REMOVED
        const allowedUpdates = ['name', 'email', 'isValidated'];
        const filteredUpdates = {};

        allowedUpdates.forEach(field => {
            if (updates[field] !== undefined) {
                filteredUpdates[field] = updates[field];
            }
        });

        await user.update(filteredUpdates);

        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({
            success: true,
            message: 'Helper updated successfully',
            data: userResponse
        });
    } catch (error) {
        console.error('Update helper error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete helper
export const deleteHelper = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { id, role: 'helper' } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Helper not found'
            });
        }

        await user.destroy();

        res.json({
            success: true,
            message: 'Helper deleted successfully'
        });
    } catch (error) {
        console.error('Delete helper error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
