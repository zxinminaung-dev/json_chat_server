
const User = require ('../models/user.model')
const ProjectMember  = require('../models/project.member.model')
var ResponseHelper = require('../utils/response.helper')

GetProjectMembersByProjectId = async (id) =>{
    var response = new ResponseHelper()
    try{
        response.data = await ProjectMember.findOne({
            where:{ProjectId:id},
            include: [{
                model: User,
                attributes: ['Id', 'Name'] // Specify which module attributes to include
            }]
        })
        response.success = true
    }catch(err){
        response.success = false;
        response.messages.push(err.name)
        console.log(err)
    }
    return response;
}

module.exports = { GetProjectMembersByProjectId }