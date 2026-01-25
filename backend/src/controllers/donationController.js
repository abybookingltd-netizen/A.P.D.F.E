import { Donation } from '../models/index.js';

// Get all donations
export const getAllDonations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Donation.findAndCountAll({
            order: [['date', 'DESC']],
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
        console.error('Get all donations error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create donation
export const createDonation = async (req, res) => {
    try {
        const donationData = req.body;

        const donation = await Donation.create({
            ...donationData,
            id: donationData.id || `don-${Date.now()}`
        });

        res.status(201).json({
            success: true,
            message: 'Donation recorded successfully',
            data: donation
        });
    } catch (error) {
        console.error('Create donation error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
