import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Expense = sequelize.define('Expense', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('Salaries', 'Field Projects', 'Logistics', 'Admin', 'Marketing'),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    recipient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Cleared', 'Pending'),
        allowNull: false,
        defaultValue: 'Pending'
    }
}, {
    tableName: 'expenses',
    timestamps: true
});

export default Expense;
