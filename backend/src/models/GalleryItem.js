import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const GalleryItem = sequelize.define('GalleryItem', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subtitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'gallery_items',
    timestamps: true
});

export default GalleryItem;
