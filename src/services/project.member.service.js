var Response = require('../utils/response')
const dbContext = require('../database/database')
const Sequelize = require('sequelize')

GetProjectMembersByProjectId = async (id) =>{
    var response = new Response()
    try{
        var query ="select u.Id, pj.Name, u.Name, u.Email from ProjectMember as p " +
        "inner join Project as pj on pj.Id = p.ProjectId " +
        "inner  join Users as  u on u.Id = p.UserId " +
       "where p.ProjectId= ? "
       response.data = await dbContext.sequelize.query(query,{
        replacements:[id],
        type: Sequelize.QueryTypes.SELECT
       })
       response.recordsTotal = response.data.length
        response.success = true
    }catch(err){
        response.success = false;
        response.messages.push(err.name)
        console.log(err)
    }
    return response;
}


module.exports = { GetProjectMembersByProjectId }