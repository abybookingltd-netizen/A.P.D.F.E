import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Donation = sequelize.define('Donation', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
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
    project: {
        type: DataTypes.STRING,
        allowNull: true
    },
    source: {
        type: DataTypes.ENUM('Individual', 'Corporate', 'Grant', 'Recurring'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Cleared', 'Pending', 'Flagged'),
        allowNull: false,
        defaultValue: 'Pending'
    }
}, {
    tableName: 'donations',
    timestamps: true
});

export default Donation;
