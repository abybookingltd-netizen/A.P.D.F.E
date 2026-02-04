import sequelize from '../config/database.js';
import User from './User.js';
import Project from './Project.js';
import ProjectGoal from './ProjectGoal.js';
import NewsUpdate from './NewsUpdate.js';
import GalleryItem from './GalleryItem.js';
import Event from './Event.js';
import Volunteer from './Volunteer.js';
import Donation from './Donation.js';
import Expense from './Expense.js';

// Define associations
Project.hasMany(ProjectGoal, {
    foreignKey: 'projectId',
    as: 'goals',
    onDelete: 'CASCADE'
});

ProjectGoal.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'project'
});

// Export all models
export {
    sequelize,
    User,
    Project,
    ProjectGoal,
    NewsUpdate,
    GalleryItem,
    Event,
    Volunteer,
    Donation,
    Expense
};

// Sync database
export const syncDatabase = async (alter = false) => {
    try {
        await sequelize.sync({ alter });
        console.log('✅ Database synchronized successfully.');
    } catch (error) {
        console.error('❌ Database sync error:', error.message);
        throw error;
    }
};
