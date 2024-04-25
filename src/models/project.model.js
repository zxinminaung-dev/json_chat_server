const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const Module = require('./module.model')

const Project = sequelize.define('Project', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    StartDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    EndDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName:'Project',
    timestamps: false // Exclude createdAt and updatedAt fields
});

//Define relationship
Project.hasMany(Module)
// Define associations
Module.belongsTo(Project);

// Define associations


module.exports = Project;
