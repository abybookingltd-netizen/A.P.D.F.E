import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const NewsUpdate = sequelize.define('NewsUpdate', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    excerpt: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'news_updates',
    timestamps: true
});

export default NewsUpdate;
