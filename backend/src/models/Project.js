import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('In Progress', 'Completed'),
        allowNull: false,
        defaultValue: 'In Progress'
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timeline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    beneficiaries: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 100
        }
    },
    completedItems: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    missingItems: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    currentFunding: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    targetFunding: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },
    purpose: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    field: {
        type: DataTypes.STRING,
        defaultValue: 'Health'
    },
    lastUpdated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'projects',
    timestamps: true
});

export default Project;
