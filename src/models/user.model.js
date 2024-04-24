const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    expiry_Date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName:'User',
    timestamps: false // Exclude createdAt and updatedAt fields
});

module.exports = User;