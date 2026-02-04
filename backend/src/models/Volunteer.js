import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Volunteer = sequelize.define('Volunteer', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    interests: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    isApproved:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    }
}, {
    tableName: 'volunteers',
    timestamps: true
});

export default Volunteer;
