import { Project, Donation, Expense, Volunteer } from '../models/index.js';
import { Op } from 'sequelize';

// Get dashboard aggregates
export const getAggregates = async (req, res) => {
    try {
        // Get all data
        const [projects, donations, expenses, volunteers] = await Promise.all([
            Project.findAll(),
            Donation.findAll(),
            Expense.findAll(),
            Volunteer.findAll()
        ]);

        // Calculate total revenue
        const totalRevenue = donations.reduce((sum, d) => sum + parseFloat(d.amount || 0), 0);

        // Calculate total expenses
        const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

        // Calculate active beneficiaries
        const benCount = projects.reduce((sum, p) => {
            const match = p.beneficiaries.match(/\d+/);
            return sum + (match ? parseInt(match[0]) : 0);
        }, 0);

        // Calculate revenue history (last 6 months)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date();
        const monthlyData = {};

        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthName = months[date.getMonth()];
            monthlyData[monthName] = 0;
        }

        // Aggregate donations by month
        donations.forEach(d => {
            const donationDate = new Date(d.date);
            if (!isNaN(donationDate.getTime())) {
                const monthName = months[donationDate.getMonth()];
                if (monthlyData[monthName] !== undefined) {
                    monthlyData[monthName] += parseFloat(d.amount || 0);
                }
            }
        });

        const revenueHistory = Object.keys(monthlyData).map(month => ({
            month,
            amount: monthlyData[month]
        }));

        res.json({
            success: true,
            data: {
                totalRevenue,
                totalExpenses,
                activeBeneficiaries: benCount.toLocaleString() + '+',
                volunteerCount: volunteers.length,
                projectCount: projects.length,
                revenueHistory
            }
        });
    } catch (error) {
        console.error('Get aggregates error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
