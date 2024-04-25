const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const Project = require('./project.model')
const Module = sequelize.define('Module', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ProjectId:{
        type: DataTypes.INTEGER,
        references:{model:Project, key:'Id'}
    }
}, {
    tableName:'Module',
    timestamps: false // Exclude createdAt and updatedAt fields
});


module.exports = Module;