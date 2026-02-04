import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/index.js';
import emailService from '../services/emailService.js';
import cacheService from '../services/cacheService.js';

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

// Generate 6-digit OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Send OTP to email
export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        console.log('\n #@#@##!the user data @##@@#@$ =>',req.body);
        

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        // Find user by email
        const user = await User.findOne({
            where: { email: email.toLowerCase() }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found with this email'
            });
        }

        if (!user.isValidated) {
            return res.status(403).json({
                success: false,
                message: 'Account not validated. Please contact administrator.'
            });
        }

        // Generate OTP
        const otp = generateOTP();
        
        // Store OTP in cache with 3 minutes expiration
        const cacheKey = `otp:${email.toLowerCase()}`;
        cacheService.set(cacheKey, {
            otp,
            userId: user.id,
            attempts: 0
        }, 3 * 60 * 1000); // 2 minutes

        // Send OTP via email
        try {
            await emailService.sendEmail({
                to: email,
                subject: 'Your Login OTP',
                template: 'otp', // Will use otp.hbs template
                data: {
                    name: user.name,
                    otp,
                    expiryMinutes: 3
                }
            });

            res.json({
                success: true,
                message: 'OTP sent to your email successfully',
                data: {
                    email: user.email,
                    expiresIn: 180 // 3 minutes in seconds
                }
            });
        } catch (emailError) {
            console.error('Error sending OTP email:', emailError);
            // Clean up cache if email fails
            cacheService.delete(cacheKey);
            return res.status(500).json({
                success: false,
                message: 'Failed to send OTP. Please try again.'
            });
        }
    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while sending OTP'
        });
    }
};

// Verify OTP and login
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        const cacheKey = `otp:${email.toLowerCase()}`;
        const cachedData = cacheService.get(cacheKey);

        if (!cachedData) {
            return res.status(401).json({
                success: false,
                message: 'OTP expired or invalid. Please request a new OTP.'
            });
        }

        // Check attempts (prevent brute force)
        if (cachedData.attempts >= 3) {
            cacheService.delete(cacheKey);
            return res.status(429).json({
                success: false,
                message: 'Too many failed attempts. Please request a new OTP.'
            });
        }

        // Verify OTP
        if (cachedData.otp !== otp.toString()) {
            // Increment attempts
            cachedData.attempts += 1;
            cacheService.set(cacheKey, cachedData, 5 * 60 * 1000);

            return res.status(401).json({
                success: false,
                message: 'Invalid OTP. Please try again.',
                attemptsRemaining: 3 - cachedData.attempts
            });
        }

        // OTP is valid, get user
        const user = await User.findByPk(cachedData.userId);

        if (!user) {
            cacheService.delete(cacheKey);
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete OTP from cache after successful verification
        cacheService.delete(cacheKey);

        // Generate token
        const token = generateToken(user);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isValidated: user.isValidated,
                    profilePicture: user.profilePicture
                },
                token
            }
        });
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during OTP verification'
        });
    }
};

// Register staff (admin only)
export const registerStaff = async (req, res) => {
    try {
        const { name, email, role } = req.body;

        if (!name || !email || !role) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and role are required'
            });
        }

        if (!['admin', 'helper'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role. Must be admin or helper'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user (no password needed for OTP auth)
        const newUser = await User.create({
            id: `u-${Date.now()}`,
            name,
            email: email.toLowerCase(),
            password: crypto.randomBytes(32).toString('hex'), // Random password (not used)
            role,
            isValidated: true
        });

        // Send welcome email
        try {
            await emailService.sendEmail({
                to: email,
                subject: 'Welcome to APD FE',
                template: 'welcome', // Will use welcome.hbs template
                data: {
                    name,
                    role
                }
            });
        } catch (emailError) {
            console.error('Error sending welcome email:', emailError);
            // Continue anyway, user is created
        }

        res.status(201).json({
            success: true,
            message: 'Staff registered successfully',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                isValidated: newUser.isValidated
            }
        });
    } catch (error) {
        console.error('Register staff error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};

// Logout (client-side token removal, no server action needed)
export const logout = (req, res) => {
    res.json({
        success: true,
        message: 'Logout successful'
    });
};

// Get current user
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isValidated: user.isValidated,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};