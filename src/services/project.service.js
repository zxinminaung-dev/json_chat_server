const dbContext = require('../database/database')
const sequelize =  require('sequelize')
const Response = require('../utils/response')
const Project = require('../models/project.model')


GetAll = async () =>{
    var response = new  Response()
    Project.findAll({
        include: [{
            model: Module,
            attributes: ['Id', 'Name','ProjectId'] // Specify which module attributes to include
        }]
    }).then(projects => {
        response.data = projects
        response.recordsTotal = projects.length
        response.success = true
    }).catch(error => {
        console.error('Error fetching projects:', error);
        response.messages.push(error)
    });
    return response;
}
GetAllCustomQurey = async () =>{
    var response = new Response()
    response.data = await dbContext.sequelize.query("select * from Project",{
        type: sequelize.QueryTypes.SELECT
    });
    response.recordsTotal = response.data.length
    return response;
}

GetById = () =>{

}

GetByName = () =>{

}

module.exports = { GetAll, GetAllCustomQurey, GetById, GetByName }