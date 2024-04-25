const dbContext = require('../database/database')
const sequelize =  require('sequelize')
const Response = require('../utils/response')
const Project = require('../models/project.model')
const Module = require('../models/module.model')

GetAll = async () =>{
    var response = new  Response()
    try{
        response.data= await Project.findAll({
            include: [{
                model: Module,
                attributes: ['Id', 'Name','ProjectId'] // Specify which module attributes to include
            }]
        });
        response.recordsTotal = projects.length
        response.success = true
    }catch(err){
        response.success = false
        response.messages.push(err.name)
    }    
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