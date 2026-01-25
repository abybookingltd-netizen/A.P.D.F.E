import { Expense } from '../models/index.js';

// Get all expenses
export const getAllExpenses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Expense.findAndCountAll({
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
        console.error('Get all expenses error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create expense
export const createExpense = async (req, res) => {
    try {
        const expenseData = req.body;

        const expense = await Expense.create({
            ...expenseData,
            id: expenseData.id || `exp-${Date.now()}`
        });

        res.status(201).json({
            success: true,
            message: 'Expense recorded successfully',
            data: expense
        });
    } catch (error) {
        console.error('Create expense error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
