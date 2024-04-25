const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const ProjectMember = require('./project.member.model');


const User = sequelize.define('User', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    UserName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    ExpiryDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName:'User',
    timestamps: false // Exclude createdAt and updatedAt fields
});


module.exports = User;