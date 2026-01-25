import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProjectGoal = sequelize.define('ProjectGoal', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    projectId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'project_goals',
    timestamps: true
});

export default ProjectGoal;
