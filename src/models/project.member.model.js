const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const Project = require('./project.model');
const User = require('./user.model');

const ProjectMember = sequelize.define('ProjectMember', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserId:{
        type: DataTypes.INTEGER,
        references:{model:User, key:'Id'},
        allowNull: false
    },
    ProjectId: {
        type: DataTypes.INTEGER,
        references:{model:Project, key:'Id'}
    },
}, {
    tableName:'ProjectMember',
    timestamps: false // Exclude createdAt and updatedAt fields
});

//  Project.belongsToMany(User, { through: ProjectMember })
//  User.belongsToMany(Project, { through: ProjectMember })

module.exports = ProjectMember;
